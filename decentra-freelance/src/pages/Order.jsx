import styled from "styled-components";
import { useEffect, useState } from "react";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";
import { db, storage } from "../firebase";
// import firebase from "@firebase/app";

import {
  collection,
  doc,
  addDoc,
  setDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  ref,
} from "firebase/firestore";
// import { ref } from "@firebase/firestore";
import CountDown from "../component/CountDown";
// import * as firebase from "firebase";

function Order() {
  const [receiversAdd, setReceiversAdd] = useState([]);
  const [currentAcc, setCurrentAcc] = useState();
  const [orderList, setOrderList] = useState([]);
  const [sampleFile, setSampleFile] = useState();
  const [originalFile, setOriginalFile] = useState();
  const [percent, setPercent] = useState(0);

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
      setCurrentAcc(account[0]);
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

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  function handleUpload() {
    if (!sampleFile || !originalFile) {
      alert("Please choose a file first!");
    }
    try {
      const storageRefSample = ref(storage, `/files/${sampleFile.name}`);
      //   const storageRefOriginal = ref(storage, `/files/${originalFile.name}`);
      const uploadSampleTask = uploadBytesResumable(
        storageRefSample,
        sampleFile
      );
      //   const uploadOriginalTask = uploadBytesResumable(storageRefOriginal, file);
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
            console.log(url);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadOrders() {
      try {
        for (let i in receiversAdd) {
          const orderAvailable = await skillswap.dealSellrToBuyr(
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
            };
            orderArray.push(orderResult);
            setOrderList(orderArray);
            console.log(
              "🚀 ~ file: Order.jsx:56 ~ loadOrders ~ orderAvailable:",
              new Date().getDate()
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadOrders();
  }, [receiversAdd]);

  return (
    <Wrapper>
      <Container>
        {orderList.map((orderData, idx) => (
          <Delivery key={idx}>
            <div>
              <h5>
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
                onChange={(e) => setSampleFile(e.target.value)}
              />
              <input
                type="file"
                placeholder="Original work"
                onChange={(e) => setOriginalFile(e.target.value)}
              />
              <button onClick={handleUpload}>Upload files</button>
              <p>{percent} "% done"</p>
            </div>
            <div>
              <p>
                <span>Amount</span>
              </p>
              <h3>{orderData.amount}ETH</h3>
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
