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
} from "firebase/firestore";

function Chatbox() {
  const [msgText, setMsgText] = useState("");
  const [displayMsg, setDisplayMsg] = useState([]);
  const [sendTo, setSendTo] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSendTo(localStorage.getItem("sellerId").toLowerCase());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const send = await addDoc(
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
      const recieved = await addDoc(
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
      setMsgText("");
    } catch (err) {
      alert(err);
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
      onSnapshot(q, (querySnapshot) => {
        setDisplayMsg(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            createdAt: timeConverter(doc.data().created.seconds),
            createdBy: doc.data().createdBy == account[0] && "msgByCurrUser",
          }))
        );
      });
    }
    getData();
  }, [sendTo]);

  useEffect(() => {
    scrollToBottom();
  }, [displayMsg]);

  return (
    <Wrapper>
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
`;

const Container = styled.div`
  /* border: 3px solid green; */
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
`;

const InputCont = styled.div`
  /* border: 3px solid blue; */
  display: grid;
  grid-template-columns: 80% 20%;
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
