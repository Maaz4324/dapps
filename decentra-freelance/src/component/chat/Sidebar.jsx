import React from "react";
import styled from "styled-components";
import chat from "../../images/chat.svg";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, doc, onSnapshot, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Sidebar({ idChange }) {
  const [receiverAccs, setReceiverAccs] = useState("");
  const navigate = useNavigate();

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
        setReceiverAccs(querySnapshot.docs.map((doc) => doc.data().chatWith));
      });
    }

    getData();
  }, []);

  return (
    <Wrapper>
      {receiverAccs &&
        receiverAccs.map((data, idx) => (
          <User key={idx} onClick={() => goToChat(data)}>
            <Profile>
              <Img>
                <img src={chat} alt="" />
              </Img>
              <div>
                <h4>{data}</h4>
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
    border: 2px solid red;
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
  /* padding: 7px; */
  /* border-radius: 10px; */
  margin: 10px 0;
  cursor: pointer;
`;

const Img = styled.div`
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/3;
`;
