import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { ethers } from "ethers";

function SellerProfile({ setSellerState }) {
  const [displayProfile, setDisplayProfile] = useState([]);
  const [displayGig, setDisplayGig] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const abi = SkillSwap.abi;

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const skillswap = new ethers.Contract(contractAddress, abi, signer);

  async function loadUser() {
    const noOfuser = await skillswap.noOfSellers();

    for (let index = 1; index <= noOfuser.toString(); index++) {
      const user = await skillswap.sellerProfile(index);

      if (user.seller.toLowerCase() == setSellerState.toLowerCase()) {
        const response = await fetch(user.uri);
        const metadata = await response.json();
        setDisplayProfile([metadata.profile]);
        setDisplayGig([metadata.gig]);
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
        {displayProfile.map((profileData, idx) => (
          <div key={idx}>
            <h1>Profile</h1>
            <img
              src={`https://gateway.ipfscdn.io/ipfs/${profileData.image}`}
              alt=""
            />
            <h3>{profileData.name}</h3>
            <h5>{profileData.description}</h5>
            <ul>
              <li>{profileData.country}</li>
              <li>
                <a href={profileData.urlS}>{profileData.urlS}</a>
              </li>
              <li>{profileData.skill}</li>
              <li>{profileData.language}</li>
            </ul>
          </div>
        ))}
        {displayGig.map((gigData, idx) => (
          <div key={idx}>
            <h1>Gig</h1>
            <div style={{ width: "50%" }}>
              <img
                style={{ width: "100%" }}
                src={`https://gateway.ipfscdn.io/ipfs/${gigData.gigImg}`}
                alt=""
              />
            </div>
            <h2>{gigData.gigHead}</h2>
            <p>{gigData.gigDescription}</p>
            <p>Offer: {gigData.gigOffer}</p>
            <p>Price: {gigData.gigPrice}</p>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
}

export default SellerProfile;

const Wrapper = styled.section`
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
  display: flex;
  width: 98%;
  max-width: 747px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 0;
  margin-bottom: 30px;
  background: var(--darkBg);
  h2 {
    font-size: 40px;
  }
  input,
  textarea,
  select {
    width: 95%;
    font-size: 16px;
    padding: 10px;
    border-radius: 7px;
    outline: none;
    border: 0;
    margin: 4px 0;
    @media (max-width: 747px) {
      width: 90%;
    }
  }
  label {
    margin-top: 30px;
  }
  form {
    width: 100%;
    button {
      width: 30%;
      margin: 10px 0;
      padding: 7px 20px;
      float: right;
    }
  }
`;
