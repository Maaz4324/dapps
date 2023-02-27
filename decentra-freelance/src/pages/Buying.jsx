import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import developer from "../../src/images/developer.svg";

function Buying(category) {
  const [listData, setListData] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const skillswap = new ethers.Contract(contractAddress, abi, signer);

  async function loadUser() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const noOfuser = await skillswap.noOfSellers();
    console.log(noOfuser.toString());
    for (let index = 1; index <= 2; index++) {
      const user = await skillswap.sellerProfile(index);
      const response = await fetch(user.uri);
      const metadata = await response.json();
      const categoryWords = metadata.gig.gigCategory.split(" ");
      console.log("🚀 ~ file: Buying.jsx:29 ~ loadUser ~ categoryWords:", user);
      let sellerAddr = listData.map((data) => data.address);
      for (let j = 0; j < categoryWords.length; j++) {
        if (
          category.category
            .toLowerCase()
            .includes(categoryWords[j].toLowerCase()) &&
          sellerAddr[sellerAddr.length - 1] != user.seller
        ) {
          //   console.log(
          //     "🚀 ~ file: Buying.jsx:36 ~ loadUser ~ sellerAddr:",
          //     sellerAddr[sellerAddr.length - 1]
          //   );
          const result = metadata.gig;
          result.userName = metadata.profile.name;
          result.address = user.seller;
          setListData((oldArray) => [...oldArray, result]);
        }
      }
    }
  }

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>Developers</h1>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
          nostrum.
        </h3>
        <CardContainer>
          {listData.map((data, idx) => (
            <Card key={idx}>
              <img
                src={`https://gateway.ipfscdn.io/ipfs/${data.gigImg}`}
                alt=""
              />
              <h5>{data.userName}</h5>
              <h4>{data.gigHead}</h4>
              <Line />
              <p>
                starting at
                <span> {data.gigPrice}Eth</span>
              </p>
            </Card>
          ))}
        </CardContainer>
      </Container>
    </Wrapper>
  );
}

export default Buying;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  padding-top: 72px;
  background: linear-gradient(to right, #111118, #161727, #1a1c35);
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1147px;
  width: 100%;
  margin: 0 auto;
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
  h3 {
    font-weight: 500;
  }
`;

const CardContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
`;

const Card = styled.div`
  padding: 20px;
  background: var(--darkBg);
  cursor: pointer;
  border-radius: 8px;
  img {
    width: 100%;
  }
  h4 {
    font-size: 20px;
    font-weight: 200;
    margin: 10px 0;
    color: var(--darkText);
  }
  h5 {
    font-size: 15px;
    font-weight: 200;
  }
  p {
    font-size: 16px;
    color: var(--darkText);
  }
`;

const Line = styled.div`
  border-bottom: 1px solid var(--gray);
  margin: 10px 0;
`;
