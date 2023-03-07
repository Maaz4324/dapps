import styled from "styled-components";
import { useEffect, useState } from "react";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";
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

function Order() {
  const [receiversAdd, setReceiversAdd] = useState([]);
  const [currentAcc, setCurrentAcc] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

  useEffect(() => {
    async function loadOrders() {
      try {
        for (let i in receiversAdd) {
          console.log(receiversAdd[i]);
          const orderAvailable = await skillswap.dealSellrToBuyr(
            currentAcc,
            receiversAdd[i]
          );
          if (
            orderAvailable.seller !=
            "0x0000000000000000000000000000000000000000"
          ) {
            console.log(
              "🚀 ~ file: Order.jsx:56 ~ loadOrders ~ orderAvailable:",
              orderAvailable
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadOrders();
  }, [receiversAdd]);

  return <Wrapper>Order</Wrapper>;
}

export default Order;

const Wrapper = styled.div`
  border: 3px solid green;
  min-height: 100vh;
  width: 100%;
  padding-top: 90px;
`;
