import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, doc, onSnapshot, getDoc } from "firebase/firestore";
import SkillSwap from "../../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";
import Loading from "../Loading";

function Sidebar({ idChange }) {
  const [loading, setLoading] = useState(false);
  const [receiverAccs, setReceiverAccs] = useState([]);
  const [msgAccs, setMsgAccs] = useState([]);

  async function goToChat(to, name) {
    localStorage.setItem("sellerId", "0x" + to);
    localStorage.setItem("sellerName", name);
    idChange("0x" + to);
  }

  useEffect(() => {
    try {
      async function getData() {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const abi = SkillSwap.abi;

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const skillswap = new ethers.Contract(contractAddress, abi, signer);

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
          setReceiverAccs(querySnapshot.docs.map((doc) => doc.data().chatWith));
          async function loadChatProfile() {
            let listOfSellers = querySnapshot.docs.map(
              (doc) => doc.data().chatWith
            );
            let chatProfile = [];
            for (let i in listOfSellers) {
              const isSeller = await skillswap.isSeller(listOfSellers[i]);
              if (isSeller) {
                const noOfSeller = await skillswap.noOfSellers();

                for (let j = 1; j <= noOfSeller.toString(); j++) {
                  const user = await skillswap.sellerProfile(j);
                  if (user.seller.toLowerCase() == "0x" + listOfSellers[i]) {
                    const response = await fetch(user.uri);
                    const metadata = await response.json();
                    let sellerObj = {
                      name: metadata.profile.name,
                      img: metadata.profile.image,
                      address: listOfSellers[i],
                    };
                    chatProfile.push(sellerObj);
                  }
                }
              } else if (!isSeller) {
                let buyerObj = {
                  name: listOfSellers[i],
                  img: "img",
                  address: listOfSellers[i],
                };
                chatProfile.push(buyerObj);
              }
            }
            setMsgAccs(chatProfile);
          }
          loadChatProfile();
        });
        setLoading(false);
      }

      getData();
    } catch (err) {
      alert(err);
    }
  }, []);

  return (
    <Wrapper>
      <h3>Chat</h3>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {msgAccs &&
            msgAccs.map((data, idx) => (
              <User key={idx} onClick={() => goToChat(data.address, data.name)}>
                <Profile>
                  <Img>
                    {data.img == "img" ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                            stroke="#ffffff"
                            strokeWidth="2"
                          ></path>{" "}
                          <path
                            d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                            stroke="#ffffff"
                            strokeWidth="2"
                          ></path>{" "}
                          <path
                            d="M6 19C6.63819 16.6928 8.27998 16 12 16C15.72 16 17.3618 16.6425 18 18.9497"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <ProfilePic
                        src={`https://gateway.ipfscdn.io/ipfs/${data.img}`}
                      />
                    )}
                  </Img>
                  <div>
                    <h4>{data.name}</h4>
                    <p>{data.address}</p>
                  </div>
                </Profile>
              </User>
            ))}
        </div>
      )}
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  border-radius: 5px;
  box-shadow: 2px 3px 10px var(--text);
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 88vh;
  width: 98%;
  border: 2px solid red;
  ::-webkit-scrollbar {
    width: 5px;
  }
  h3 {
    font-size: 28px;
    padding-top: 20px;
    padding-left: 10px;
    text-align: center;
  }
  border: 2px solid blue;
  @media (max-width: 1280px) {
    /* display: none; */
  }
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: start;
  padding: 20px 12px;
  svg {
    width: 100%;
  }
  img {
    width: 100%;
  }
  h4 {
    padding: 0;
    width: 200px;
    word-wrap: break-word;
    margin-left: 10px;
  }
  p {
    color: var(--darkText);
    font-size: 13px;
    font-weight: 100;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 10px;
  }
`;

const User = styled.div`
  border-bottom: 1px solid var(--line);
  cursor: pointer;
`;

const Img = styled.div`
  width: 15%;
`;

const ProfilePic = styled.img`
  width: 100%;
  padding: 5px;
  border-radius: 50%;
`;
