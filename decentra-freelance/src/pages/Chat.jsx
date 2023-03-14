import React, { useState, useEffect } from "react";
import Chatbox from "../component/chat/Chatbox";
import Sidebar from "../component/chat/Sidebar";
import styled from "styled-components";
import { db } from "../firebase";
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
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";

function Chat() {
  const [changeSellerId, setChangeSellerId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [buyerName, setBuyerName] = useState();
  const [currentAcc, setCurrentAcc] = useState();

  useEffect(() => {
    async function getBuyerName() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const abi = SkillSwap.abi;

      const contractAddress = "0x239C71B812e5394e28B75De4d2DCDEBB654a3df1";

      const skillswap = new ethers.Contract(contractAddress, abi, signer);

      const isSeller = await skillswap.isSeller(account[0]);
      setCurrentAcc(account[0].toLowerCase());
      const q = query(
        collection(
          db,
          "buyerName",
          account[0].toLowerCase().substring(2),
          "profile"
        )
      );
      onSnapshot(q, (querySnapshot) => {
        let buyerAccs = querySnapshot.docs.map((doc) => doc.data().account);
        if (!buyerAccs.includes(account[0].toLowerCase()) && !isSeller) {
          setModalOpen(true);
        }
      });
    }
    getBuyerName();
  }, []);

  async function submitName() {
    if (buyerName.trim() != "") {
      try {
        await addDoc(
          collection(db, "buyerName", currentAcc.substring(2), "profile"),
          {
            account: currentAcc,
            name: buyerName,
          }
        );
        alert("Successfully added!");
        window.location.reload(false);
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <Wrapper>
      {modalOpen == true && (
        <NameModal>
          <label>Set your name</label>
          <input
            type="text"
            required
            onChange={(e) => setBuyerName(e.target.value)}
          />
          <button onClick={submitName}>Submit</button>
        </NameModal>
      )}
      <Container>
        <Sidebar idChange={setChangeSellerId} />
        <Chatbox sellerChangeState={changeSellerId} />
      </Container>
    </Wrapper>
  );
}

export default Chat;

const Wrapper = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  color: rgb(255, 255, 255);
  padding-top: 100px;
  background: var(--black);
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  background: var(--darkBg);
  width: 100%;
  max-width: 1347px;
  margin: 0 auto;
  min-height: 80vh;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 25% 75%;
  margin-bottom: 80px;
  padding: 20px;
`;

const NameModal = styled.div`
  position: absolute;
  top: 40%;
  left: 37%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: var(--black);
  border-radius: 10px;
  label,
  input,
  button {
    margin: 5px 0;
  }
  input {
    padding: 7px;
    font-size: 20px;
    border: 0;
    outline: none;
    background: var(--darkBg);
    color: white;
  }
  label {
    font-size: 30px;
  }
  button {
    font-size: 18px;
    padding: 7px 40px;
    cursor: pointer;
    background: var(--primary);
    margin-top: 10px;
  }
`;
