import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import SkillSwap from "../../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { db } from "../../firebase";
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
} from "firebase/firestore";
import { ethers } from "ethers";

function Chatbox({ sellerChangeState }) {
  const [msgText, setMsgText] = useState("");
  const [displayMsg, setDisplayMsg] = useState([]);
  const [sendTo, setSendTo] = useState("");
  const [receiverAccs, setReceiverAccs] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [offerDeadLine, setOfferDeadLine] = useState("");
  const [offerBudget, setOfferBudget] = useState("");
  const [offerDes, setOfferDes] = useState("");
  const [displayOffer, setDisplayOffer] = useState([]);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [currentAcc, setCurrentAcc] = useState();
  const [senderOfferDeleteId, setSenderOfferDeleteId] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const skillswap = new ethers.Contract(contractAddress, abi, signer);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSendTo(localStorage.getItem("sellerId").toLowerCase());
  }, [sendTo]);

  useEffect(() => {
    setSendTo(localStorage.getItem("sellerId").toLowerCase());
  }, [sellerChangeState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const DisplayOfferUser = () => {
    if (displayOffer[0].data.createdBy == currentAcc) {
      return <h3>You have made an offer.</h3>;
    }
    if (displayOffer[0].data.createdBy == sendTo) {
      return <h3>Seller has made an offer.</h3>;
    }
    if ((displayOffer.length = 0)) {
      return <p></p>;
    }
  };

  useEffect(() => {
    async function getData() {
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
        setReceiverAccs(querySnapshot.docs.map((doc) => doc.data().chatWith));
      });
    }
    getData();
  }, []);

  async function saveSenderAccs() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    await addDoc(collection(db, "chatList", sendTo.substring(2), "receivers"), {
      chatWith: account[0].substring(2).toLowerCase(),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgText.trim() != "") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await addDoc(
          collection(
            db,
            "userChat",
            account[0].substring(2).toLowerCase(),
            "receiver",
            sendTo.substring(2),
            "messages"
          ),
          {
            message: msgText,
            created: Timestamp.now(),
            createdBy: account[0],
          }
        );
        await addDoc(
          collection(
            db,
            "userChat",
            sendTo.substring(2),
            "receiver",
            account[0].substring(2).toLowerCase(),
            "messages"
          ),
          {
            message: msgText,
            created: Timestamp.now(),
            createdBy: account[0],
          }
        );
        const r = query(
          collection(db, "chatList", sendTo.substring(2), "receivers")
        );
        onSnapshot(r, (querySnapshot) => {
          if (
            !querySnapshot.docs
              .map((doc) => doc.data().chatWith)
              .includes(account[0].substring(2))
          ) {
            saveSenderAccs();
          }
        });

        setMsgText("");
      } catch (err) {
        alert(err);
      }
    }
  };

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

  useEffect(() => {
    async function getData() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!sendTo.substring(2) == "") {
        const q = query(
          collection(
            db,
            "userChat",
            account[0].substring(2).toLowerCase(),
            "receiver",
            sendTo.substring(2),
            "messages"
          ),
          orderBy("created", "desc")
        );
        const r = query(
          collection(
            db,
            "userChat",
            sendTo.substring(2),
            "receiver",
            account[0].substring(2).toLowerCase(),
            "messages"
          ),
          orderBy("created", "desc")
        );
        onSnapshot(r, (querySnapshot) => {
          let isOfferBudget = querySnapshot.docs.map(
            (doc) => doc.data().offerBudget
          );
          let getOfferId = querySnapshot.docs.map((doc) => doc.id);
          for (let i in isOfferBudget) {
            if (isOfferBudget[i] != undefined) {
              // console.log(getOfferId[i]);
              setSenderOfferDeleteId(getOfferId[i]);
            }
          }
        });
        onSnapshot(q, (querySnapshot) => {
          let dataList = querySnapshot.docs.map((doc) => doc.data().message);
          let dataListOffer = querySnapshot.docs.map(
            (doc) => doc.data().offerBudget
          );
          let dataList2 = querySnapshot.docs.map((doc) => doc);
          let dataArr = [];
          let dataArr2 = [];
          for (let i in dataList) {
            if (dataList[i] != undefined) {
              dataArr.push({
                id: dataList2[i].id,
                message: dataList2[i].data().message,
                createdAt: timeConverter(dataList2[i].data().created.seconds),
                createdBy:
                  dataList2[i].data().createdBy == account[0] &&
                  "msgByCurrUser",
              });
            }
            if (dataListOffer[i] != undefined) {
              dataArr2.push({ id: dataList2[i].id, data: dataList2[i].data() });
            }
          }
          setDisplayMsg(dataArr);
          setDisplayOffer(dataArr2);
        });
      }
    }
    getData();
  }, [sendTo]);

  useEffect(() => {
    async function getData() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (
        !receiverAccs.includes(sendTo.substring(2)) &&
        account[0].substring(2).toLowerCase() != sendTo.substring(2)
      ) {
        await addDoc(
          collection(
            db,
            "chatList",
            account[0].substring(2).toLowerCase(),
            "receivers"
          ),
          {
            chatWith: sendTo.substring(2),
          }
        );
      }
    }
    getData();
  }, [receiverAccs]);

  async function makeOffer(e) {
    e.preventDefault();
    if (
      offerBudget.trim() != "" &&
      offerDeadLine.trim() != "" &&
      offerDes.trim() != "" &&
      parseFloat(offerBudget) * 100000 > 1 &&
      offerBudget > 0 &&
      offerDeadLine > 0
    ) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await addDoc(
          collection(
            db,
            "userChat",
            account[0].substring(2).toLowerCase(),
            "receiver",
            sendTo.substring(2),
            "messages"
          ),
          {
            offerBudget: offerBudget,
            offerDeadLine: offerDeadLine,
            offerDes: offerDes,
            created: Timestamp.now(),
            createdBy: account[0],
          }
        );
        await addDoc(
          collection(
            db,
            "userChat",
            sendTo.substring(2),
            "receiver",
            account[0].substring(2).toLowerCase(),
            "messages"
          ),
          {
            offerBudget: offerBudget,
            offerDeadLine: offerDeadLine,
            offerDes: offerDes,
            created: Timestamp.now(),
            createdBy: account[0],
          }
        );
        setModalOpen(false);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Set all requirements correctly.");
    }
  }

  async function handleDeleteOffer(id) {
    try {
      await deleteDoc(
        doc(
          db,
          "userChat",
          sendTo.substring(2),
          "receiver",
          currentAcc.substring(2).toLowerCase(),
          "messages",
          senderOfferDeleteId
        )
      );
      await deleteDoc(
        doc(
          db,
          "userChat",
          currentAcc.substring(2).toLowerCase(),
          "receiver",
          sendTo.substring(2),
          "messages",
          id
        )
      );
      setDisplayOffer([]);
      setModalOpen(false);
    } catch (err) {
      alert(err);
    }
  }

  async function makeOrder(budget, deadline, id) {
    try {
      const amount = JSON.stringify(budget);
      console.log("🚀 ~ file: Chatbox.jsx:367 ~ makeOrder ~ amount:", amount);
      console.log(budget);

      console.log(sendTo);
      let deadlineSec = deadline * 86400;
      console.log(deadlineSec);
      const EtherToWei = ethers.utils.parseUnits(budget, "ether");
      console.log(
        "🚀 ~ file: Chatbox.jsx:374 ~ makeOrder ~ EtherToWei:",
        EtherToWei.toString()
      );
      let totalBudget = parseInt(EtherToWei) + parseInt(EtherToWei) * (1 / 10);
      console.log(
        "🚀 ~ file: Chatbox.jsx:376 ~ makeOrder ~ totalBudget:",
        totalBudget.toString()
      );
      // const ethValue = ethers.utils.formatEther(budget);
      console.log(EtherToWei.toString());
      console.log("working");
      const success = await skillswap.placeOrder(
        sendTo,
        EtherToWei.toString(),
        deadlineSec,
        {
          value: ethers.BigNumber.from(totalBudget.toString()),
        }
      );
      console.log(success);

      handleDeleteOffer(id);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  document.addEventListener("wheel", function () {
    if (
      document.activeElement.type === "number" &&
      document.activeElement.classList.contains("noscroll")
    ) {
      document.activeElement.blur();
    }
  });

  function closeModal() {
    setModalOpen(false);
    setOfferDeadLine();
    setOfferBudget();
    setOfferDes();
  }
  useEffect(() => {
    scrollToBottom();
  }, [displayMsg]);

  return (
    <Wrapper>
      {modalOpen || openOfferModal ? (
        <div className="modalBack"></div>
      ) : (
        <div className="openModalAlt"></div>
      )}
      {modalOpen ? (
        <Modal>
          <section className="modalhead">
            <h3>Make offer</h3>
            <div className="closeModal" onClick={closeModal}>
              ×
            </div>
          </section>
          <div>
            <label>Days: </label>
            <input
              type="number"
              className="noscroll"
              onChange={(e) => setOfferDeadLine(e.target.value)}
              value={offerDeadLine}
            ></input>
          </div>
          <div>
            <label>Amount: </label>
            <input
              type="number"
              onChange={(e) => setOfferBudget(e.target.value)}
              value={offerBudget}
            ></input>
          </div>
          <div>
            <label>Description: </label>
            <textarea
              name="description"
              cols="20"
              rows="10"
              onChange={(e) => setOfferDes(e.target.value)}
              value={offerDes}
            ></textarea>
          </div>
          <button onClick={makeOffer}>Send</button>
        </Modal>
      ) : (
        <div className="openModalAlt"></div>
      )}
      <Main>
        <MainHead>
          <h1>{sendTo}</h1>
        </MainHead>
        <Container>
          <MesContent>
            {displayMsg.map((msgData, idx) => (
              <Mes key={idx} className={msgData.createdBy}>
                <ShowMes>
                  <p>{msgData.message}</p>
                </ShowMes>
                <span>{msgData.createdAt}</span>
              </Mes>
            ))}
          </MesContent>
          {/* <div ref={messagesEndRef} /> */}
        </Container>
        <InputCont>
          <input
            type="text"
            placeholder="Chat"
            onChange={(e) => setMsgText(e.target.value)}
            value={msgText}
          />
          <span onClick={() => setModalOpen(true)}>offer</span>
          <button onClick={handleSubmit}>Send</button>
        </InputCont>
      </Main>
      <Side>
        {displayOffer.length != 0 && (
          <OfferModal>
            <OfferContent>
              <DisplayOfferUser />
            </OfferContent>
            {displayOffer.map((offerData, idx) => (
              <Offer key={idx}>
                <p>{offerData.data.offerDes}</p>
                <h3>{offerData.data.offerBudget}ETH</h3>
                <h3>{offerData.data.offerDeadLine} Days</h3>
                {displayOffer[0].data.createdBy == currentAcc ? (
                  <button onClick={() => handleDeleteOffer(offerData.id)}>
                    withdraw offer
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        makeOrder(
                          offerData.data.offerBudget,
                          offerData.data.offerDeadLine,
                          offerData.id
                        )
                      }
                    >
                      Accept offer
                    </button>
                    <button onClick={() => handleDeleteOffer(offerData.id)}>
                      Decline
                    </button>
                  </div>
                )}
              </Offer>
            ))}
          </OfferModal>
        )}
      </Side>
    </Wrapper>
  );
}

export default Chatbox;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 69% 29%;
  grid-gap: 10px;
  .modalBack {
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid white;
    min-height: 128vh;
    width: 100%;
    filter: blur(20px);
    -webkit-filter: blur(20px);
  }
  .openModalAlt {
    display: none;
  }
`;

const Container = styled.div`
  /* border: 3px solid green; */
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
  .openModalAlt {
    display: none;
  }
`;

const InputCont = styled.div`
  /* border: 3px solid blue; */
  display: grid;
  grid-template-columns: 70% 10% 20%;
  align-self: flex-end;
  border-radius: 20px;
  width: 100%;
  input {
    padding: 10px 20px;
    font-size: 20px;
    border: 0;
    outline: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  button {
    padding: 10px;
    font-size: medium;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 0;
  }
  span {
    background: white;
    text-align: center;
    color: black;
    cursor: pointer;
    padding: 10px;
  }
`;

const Mes = styled.div`
  margin: 10px 0;
`;

const MesContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  flex-direction: column-reverse;
  span {
    font-size: 12px;
    color: var(--darkText);
  }
  .msgByCurrUser {
    align-self: flex-end;
  }
`;

const ShowMes = styled.div`
  padding: 10px 20px;
  width: fit-content;
  background: var(--primary);
  color: black;
  font-weight: 600;
  font-style: italic;
  border-radius: 20px;
`;

const Modal = styled.div`
  position: absolute;
  top: 17%;
  left: 33%;
  z-index: 999;
  background: black;
  display: grid;
  min-height: 40vh;
  padding: 60px;
  border-radius: 10px;
  div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: start;
    margin: 10px 0;
    width: 100%;
    input {
      padding: 10px;
      font-size: 18px;
      width: 95%;
      border: 0;
      outline: none;
      background: var(--darkBg);
      color: white;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }
    textarea {
      min-width: 400px;
      max-width: 450px;
      padding: 10px;
      font-size: 18px;
      border: 0;
      outline: none;
      background: var(--darkBg);
      color: white;
      font-weight: 200;
    }
    label {
      margin-bottom: 5px;
    }
  }
  button {
    font-size: 18px;
    padding: 7px 20px;
  }
  .modalhead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 25px;
    }
  }
  .closeModal {
    width: fit-content;
    cursor: pointer;
    font-size: 22px;
  }
`;

const OfferContent = styled.div`
  color: #91b7f4;
  cursor: pointer;
  p {
    font-style: underline;
    border-bottom: 2px solid #91b7f4;
  }
`;

const OfferModal = styled.div`
  background: black;
  min-height: 40vh;
  padding: 10px;
  border-radius: 10px;
  p,
  h3 {
    margin: 5px 0;
  }
  button {
    padding: 7px 10px;
    cursor: pointer;
    font-size: 18px;
  }
`;

const Offer = styled.div``;

const Main = styled.div`
  &::-webkit-scrollbar {
    width: 10px;
  }
`;

const Side = styled.div``;

const MainHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
