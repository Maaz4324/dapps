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
          <Content className="profile" key={idx}>
            <h2>About the seller</h2>
            {/* <ProfileContainer> */}
            <div
              style={{
                backgroundImage: `url(https://gateway.ipfscdn.io/ipfs/${profileData.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100px",
                height: "100px",
              }}
            ></div>
            <h3>{profileData.name}</h3>
            {/* </ProfileContainer> */}
            <h5>{profileData.description}</h5>
            <ul>
              <li>{profileData.country}</li>
              <li>
                <a href={profileData.urlS}>{profileData.urlS}</a>
              </li>
              <li>{profileData.skill}</li>
              <li>{profileData.language}</li>
            </ul>
          </Content>
        ))}
        {displayGig.map((gigData, idx) => (
          <Content className="gig" key={idx}>
            <h2>{gigData.gigHead}</h2>
            <div>
              <img
                style={{ width: "100%" }}
                src={`https://gateway.ipfscdn.io/ipfs/${gigData.gigImg}`}
                alt=""
              />
            </div>
            <p>{gigData.gigDescription}</p>
            <p>Offer: {gigData.gigOffer}</p>
            <p>Price: {gigData.gigPrice}</p>
          </Content>
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
  border: 2px solid white;
  display: flex;
  width: 98%;
  max-width: 1147px;
  align-items: start;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin: 0 auto;
  padding: 40px 0;
  margin-bottom: 30px;
  /* background: var(--darkBg); */
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
  .profile {
    width: 40%;
    div {
      width: 40%;
      border-radius: 500px;
      width: 60px;
      height: 60px;
      img {
        border-radius: 500px;
        width: 60px;
        height: 60px;
      }
    }
  }
  .gig {
    width: 60%;
    div {
      width: 100%;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  margin: 0 20px;
  border: 2px solid red;

  div {
    border: 2px solid white;
    // width: 100%;
    margin: 10px 0;
    img {
      //   width: 100%;
    }
  }
  ul li {
    list-style: none;
  }
  h2 {
    font-size: 30px;
  }
  h5 {
    font-size: 16px;
    font-weight: 200;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 8px solid red;
`;
