import React from "react";
import styled from "styled-components";
import chat from "../../images/chat.svg";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, doc, onSnapshot, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import SkillSwap from "../../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";

function Sidebar({ idChange }) {
  // const [receiverAccs, setReceiverAccs] = useState("");
  const [receicerNameAdd, setReceicerNameAdd] = useState([]);

  async function goToChat(to) {
    localStorage.setItem("sellerId", "0x" + to);
    idChange("0x" + to);
  }

  useEffect(() => {
    async function getData() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const q = query(
        collection(
          db,
          "chatList",
          account[0].substring(2).toLowerCase(),
          "receivers"
        )
      );
      onSnapshot(q, (querySnapshot) => {
        // setReceiverAccs(querySnapshot.docs.map((doc) => doc.data().chatWith));
        let receiverAccs = querySnapshot.docs.map((doc) => doc.data().chatWith);
        const q = query(collection(db, "buyerName"));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const abi = SkillSwap.abi;

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const skillswap = new ethers.Contract(contractAddress, abi, signer);
        onSnapshot(q, (querySnapshot) => {
          async function loadNames() {
            let namesArr = [];
            for (let i in receiverAccs) {
              const isSeller = await skillswap.isSeller(receiverAccs[i]);
              // console.log(receiverAccs[i]);
              if (isSeller) {
                const noOfuser = await skillswap.noOfSellers();

                for (let index = 1; index <= noOfuser.toString(); index++) {
                  const user = await skillswap.sellerProfile(index);
                  const response = await fetch(user.uri);
                  const metadata = await response.json();
                  namesArr.push({
                    name: metadata.profile.name,
                    address: receiverAccs[i],
                  });
                }
              } else {
                // console.log("not seller " + receiverAccs[i]);
                let buyerdetailArr = querySnapshot.docs.map(
                  (doc) => doc.data().account
                );
                for (let j in querySnapshot.docs.map(
                  (doc) => doc.data().account
                )) {
                  console.log("b " + buyerdetailArr[j]);
                  console.log("r 0x" + receiverAccs[i]);
                  if (buyerdetailArr[j] == "0x" + receiverAccs[i]) {
                    console.log(
                      querySnapshot.docs.map((doc) => doc.data().name)
                    );
                  }
                }
                // console.log(buyerdetailArr[0]);
                // namesArr.push({
                //   name: buyerdetailArr,
                //   address: receiverAccs[i],
                // });
              }
            }
            // console.log(namesArr);
          }
          loadNames();
        });
      });
    }

    getData();
  }, []);

  return (
    <Wrapper>
      {receicerNameAdd &&
        receicerNameAdd.map((data, idx) => (
          <User key={idx} onClick={() => goToChat(data.address)}>
            <Profile>
              <Img>
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                      stroke="#ffffff"
                      stroke-width="2"
                    ></path>{" "}
                    <path
                      d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                      stroke="#ffffff"
                      stroke-width="2"
                    ></path>{" "}
                    <path
                      d="M6 19C6.63819 16.6928 8.27998 16 12 16C15.72 16 17.3618 16.6425 18 18.9497"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Img>
              <div>
                <h4>{data.name}</h4>
                <p>
                  Previous chat fjdslj ljsdflsdkfj lasdjfosadfjsoagffg oihgdj
                  soafifj heihl omaa az hai ow are ou
                </p>
              </div>
            </Profile>
          </User>
        ))}
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  padding: 5px;
`;

const Profile = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 20% 60%;
  div {
  }
  img {
    width: 100%;
  }
  h4 {
    padding: 0;
    padding-top: 6px;
    width: 200px;
    word-wrap: break-word;
  }
  p {
    color: var(--darkText);
    font-size: 13px;
    font-weight: 100;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const User = styled.div`
  border-bottom: 1px solid var(--gray);
  margin: 10px 0;
  cursor: pointer;
`;

const Img = styled.div`
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/3;
`;
