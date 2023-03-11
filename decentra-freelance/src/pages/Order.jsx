import styled from "styled-components";
import { useEffect, useState } from "react";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";
import { db, storage } from "../firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import CountDown from "../component/CountDown";

function Order() {
  const [receiversAdd, setReceiversAdd] = useState([]);
  const [currentAcc, setCurrentAcc] = useState();
  const [orderList, setOrderList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);
  const [sampleFile, setSampleFile] = useState();
  const [originalFile, setOriginalFile] = useState();
  const [percent, setPercent] = useState(0);
  const [sampleUrl, setSampleUrl] = useState();
  const [originalUrl, setOriginalUrl] = useState();
  const [buyerToSend, setBuyerToSend] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const skillswap = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    async function loadRecieverAdd() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAcc(account[0].toLowerCase());
      const q = query(
        collection(
          db,
          "chatList",
          account[0].substring(2).toLowerCase(),
          "receivers"
        )
      );
      onSnapshot(q, (querySnapshot) => {
        setReceiversAdd(querySnapshot.docs.map((doc) => doc.data().chatWith));
      });
    }
    loadRecieverAdd();
  }, []);

  function handleUpload(buyer) {
    if (!sampleFile && !originalFile) {
      alert("Please choose a file first!");
    }
    try {
      setBuyerToSend(buyer);
      const storageRefSample = ref(storage, `/files/${sampleFile.name}`);
      const storageRefOriginal = ref(storage, `/files/${originalFile.name}`);
      const uploadSampleTask = uploadBytesResumable(
        storageRefSample,
        sampleFile
      );
      const uploadOriginalTask = uploadBytesResumable(
        storageRefOriginal,
        originalFile
      );
      uploadOriginalTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadSampleTask.snapshot.ref).then((url) => {
            setOriginalUrl(url);
          });
        }
      );
      uploadSampleTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadSampleTask.snapshot.ref).then((url) => {
            setSampleUrl(url);
          });
        }
      );
      alert("File sent successfully");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function uploadToBuyer() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await addDoc(
        collection(
          db,
          "fileUrl",
          buyerToSend,
          "deliverBy",
          account[0].toLowerCase().substring(2),
          "items"
        ),
        {
          sampleUrl: sampleUrl,
          originalUrl: originalUrl,
          buyer: buyerToSend,
        }
      );
    }
    uploadToBuyer();
  }, [sampleUrl]);

  useEffect(() => {
    async function loadOrders() {
      try {
        for (let i in receiversAdd) {
          const orderAvailable = await skillswap.deal(
            currentAcc,
            receiversAdd[i]
          );
          if (
            orderAvailable.seller !=
            "0x0000000000000000000000000000000000000000"
          ) {
            let orderArray = [];
            // let days = parseInt(orderAvailable.duration) / 86400;
            let orderResult = {
              amount: orderAvailable.amount.toString(),
              deadline: orderAvailable.duration.toString(),
              buyer: receiversAdd[i].toLowerCase(),
            };
            orderArray.push(orderResult);
            console.log(orderResult);
            setOrderList(orderArray);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadOrders();
  }, [receiversAdd]);

  async function acceptOrder(seller) {
    const transaction = await skillswap.Transaction(seller, currentAcc);
  }

  useEffect(() => {
    async function loadDelivery() {
      try {
        let deliveryArray = [];
        for (let i in receiversAdd) {
          const deliveryAvailable = await skillswap.deal(
            receiversAdd[i],
            currentAcc
          );
          if (
            deliveryAvailable.seller !=
            "0x0000000000000000000000000000000000000000"
          ) {
            // let days = parseInt(orderAvailable.duration) / 86400;
            const r = query(
              collection(
                db,
                "fileUrl",
                currentAcc.substring(2),
                "deliverBy",
                deliveryAvailable.seller.toLowerCase().substring(2),
                "items"
              )
            );
            if (
              (await skillswap.Transaction(
                deliveryAvailable.seller,
                currentAcc
              )) == 0
            ) {
              console.log(
                await skillswap.Transaction(
                  deliveryAvailable.seller,
                  currentAcc
                )
              );
              onSnapshot(r, (querySnapshot) => {
                let deliveryResult = {
                  amount: deliveryAvailable.amount.toString(),
                  deadline: deliveryAvailable.duration.toString(),
                  sampleFileLink: querySnapshot.docs.map(
                    (doc) => doc.data().sampleFile
                  ),
                  seller: deliveryAvailable.seller,
                };
                deliveryArray.push(deliveryResult);
              });
            } else {
              onSnapshot(r, (querySnapshot) => {
                let deliveryResult = {
                  amount: deliveryAvailable.amount.toString(),
                  deadline: deliveryAvailable.duration.toString(),
                  sampleFileLink: querySnapshot.docs.map(
                    (doc) => doc.data().sampleFile
                  ),
                  originalFileLink: "original",
                  seller: deliveryAvailable.seller,
                };
                deliveryArray.push(deliveryResult);
                setDeliveryList(deliveryArray);
                console.log(deliveryArray);
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadDelivery();
  }, [receiversAdd]);

  return (
    <Wrapper>
      <Container>
        {orderList.map((orderData, idx) => (
          <Delivery key={idx}>
            <div>
              <h5>
                <span style={{ fontSize: "16px" }}>
                  Order by: {orderData.buyer}
                </span>{" "}
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                doloremque illum consequuntur suscipit aliquid! Iure enim ab
                nemo nihil. Numquam voluptate doloribus minima quam, quasi
                temporibus illo. Itaque, recusandae ipsum?
              </h5>
            </div>
            <div>
              <p>
                <span>Time left</span>
              </p>
              <div className="timecolor">
                <CountDown timeStamp={orderData.deadline * 1000} />
              </div>
            </div>
            <div>
              <input
                type="file"
                placeholder="Sample file"
                onChange={(e) => setSampleFile(e.target.files[0])}
              />
              <input
                type="file"
                placeholder="Original work"
                onChange={(e) => setOriginalFile(e.target.files[0])}
              />
              <button onClick={() => handleUpload(orderData.buyer)}>
                Upload files
              </button>
              <p>{percent}% done</p>
            </div>
            <div>
              <p>
                <span>Amount</span>
              </p>
              <h3>{orderData.amount}ETH</h3>
            </div>
          </Delivery>
        ))}
        {deliveryList.map((deliveryData, idx) => (
          <Delivery key={idx}>
            <div>
              <h5>
                <span style={{ fontSize: "16px" }}>
                  Order by: {deliveryData.seller}
                </span>{" "}
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                doloremque illum consequuntur suscipit aliquid! Iure enim ab
                nemo nihil. Numquam voluptate doloribus minima quam, quasi
                temporibus illo. Itaque, recusandae ipsum?
              </h5>
            </div>
            <div>
              <p>
                <span>Time left</span>
              </p>
              <div className="timecolor">
                <CountDown timeStamp={deliveryData.deadline * 1000} />
              </div>
            </div>
            <div>
              {deliveryData.sampleFileLink.length != 0 ? (
                <div>
                  <a href={deliveryData.sampleFileLink} download>
                    Download file
                  </a>
                  <a>{deliveryData.originalFileLink}</a>
                  <button onClick={() => acceptOrder(deliveryData.seller)}>
                    Accept delivery
                  </button>
                </div>
              ) : (
                <p>Files will appear when seller delivers</p>
              )}
            </div>
            <div>
              <p>
                <span>Amount</span>
              </p>
              <h3>{deliveryData.amount}ETH</h3>
            </div>
          </Delivery>
        ))}
      </Container>
    </Wrapper>
  );
}

export default Order;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 90px;
  background: var(--black);
`;

const Container = styled.div`
  width: 97%;
  max-width: 1147px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto;
  grid-gap: 30px;
`;

const Delivery = styled.div`
  padding: 50px 30px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 30px;
  align-items: center;
  background: var(--darkBg);
  border-radius: 10px;
  h5 {
    font-size: 24px;
  }
  h3 {
    font-size: 28px;
  }
  span {
    color: var(--darkText);
  }
  .timecolor {
    color: var(--primary);
  }
`;
