import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
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
import { async } from "@firebase/util";

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
      return <p>You have made an offer. Click here to see</p>;
    }
    if (displayOffer[0].data.createdBy == sendTo) {
      return <p>Seller has made an offer. Click here to see</p>;
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
                dataList2[i].data().createdBy == account[0] && "msgByCurrUser",
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
      offerDes.trim() != ""
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
    } catch (err) {
      alert(err);
    }
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
          <h3>Make offer</h3>
          <div className="closeModal" onClick={() => setModalOpen(false)}>
            close
          </div>
          <div>
            <label>Days: </label>
            <input
              type="number"
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
      <h1>{sendTo}</h1>
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
      {displayOffer.length != 0 && (
        <OfferContent onClick={() => setOpenOfferModal(true)}>
          <DisplayOfferUser />
        </OfferContent>
      )}
      {openOfferModal ? (
        <OfferModal>
          {displayOffer.map((offerData, idx) => (
            <Offer key={idx}>
              <div
                className="closeModal"
                onClick={() => setOpenOfferModal(false)}
              >
                close
              </div>
              <h3>{offerData.data.offerBudget}ETH</h3>
              <h3>{offerData.data.offerDeadLine} Days</h3>
              <h3>Des: {offerData.data.offerDes}</h3>
              {displayOffer[0].data.createdBy == currentAcc ? (
                <button onClick={() => handleDeleteOffer(offerData.id)}>
                  withdraw offer
                </button>
              ) : (
                <button>Accept offer</button>
              )}
            </Offer>
          ))}
        </OfferModal>
      ) : (
        <div className="openModalAlt"></div>
      )}
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
    </Wrapper>
  );
}

export default Chatbox;

const Wrapper = styled.div`
  /* border: 3px solid red; */
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
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
  top: 30%;
  left: 40%;
  z-index: 999;
  background: black;
  min-height: 40vh;
  padding: 60px;
  border-radius: 10px;
  div {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    margin: 10px 0;
    input {
      padding: 10px;
    }
  }
  .closeModal {
    position: relative;
    top: -70px;
    left: 220px;
    cursor: pointer;
  }
`;

const OfferContent = styled.div`
  color: var(--primary);
  cursor: pointer;
  p {
    font-style: underline;
    border-bottom: 2px solid var(--primary);
  }
`;

const OfferModal = styled.div`
  position: absolute;
  top: 30%;
  left: 40%;
  z-index: 999;
  background: black;
  min-height: 40vh;
  padding: 60px;
  border-radius: 10px;
  .closeModal {
    position: relative;
    top: -20px;
    left: 20px;
    cursor: pointer;
  }
`;

const Offer = styled.div``;
