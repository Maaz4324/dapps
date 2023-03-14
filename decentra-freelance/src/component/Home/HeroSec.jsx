import React from "react";
import styled from "styled-components";
import blob1 from "../../images/blob1.svg";
import blob2 from "../../images/blob2.svg";
import blob3 from "../../images/blob3.svg";
import blob4 from "../../images/blob4.svg";
import { useNavigate } from "react-router-dom";

function HeroSec() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>Decentralized</h1>
      <h1 className="outline">Freelancing</h1>
      <h5>
        Skill Swap is fully focused on NFTs. Start your NFT Web3 freelancing
        journey here, or hire someone to help you build the future of your NFT
        Web3 startup.
      </h5>
      <button onClick={() => navigate("/selling")}>View profile</button>
      <img
        src={blob1}
        className="blob1"
        alt="skillswap - skill swap hero section"
      />
      <img
        src={blob2}
        className="blob2"
        alt="skillswap - skill swap hero section"
      />
      <img
        src={blob3}
        className="blob3"
        alt="skillswap - skill swap hero section"
      />
      <img
        src={blob4}
        className="blob4"
        alt="skillswap - skill swap hero section"
      />
    </Wrapper>
  );
}

export default HeroSec;

const Wrapper = styled.section`
  min-height: 100vh;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  z-index: -1;

  button {
    z-index: 100;
    padding: 10px 40px;
    font-size: large;
    font-weight: 700;
    margin: 10px 0;
    border: 2px solid white;
    border-radius: 10px;
    background: transparent;
    color: white;
    cursor: pointer;
    &:hover {
      transition: all 0.3s;
      background-color: white;
      color: black;
    }
  }
  h1 {
    font-size: 120px;
    font-weight: 900;
    word-break: normal;
    z-index: 100;
    @media (max-width: 810px) {
      font-size: 80px;
    }
    @media (max-width: 540px) {
      font-size: 60px;
    }
    @media (max-width: 400px) {
      font-size: 40px;
    }
  }
  h5 {
    z-index: 100;
    padding: 0 10px;
    width: 40%;
  }
  .outline {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #ffffff;
    color: transparent;
  }
  img {
    position: absolute;
    z-index: 3;
    width: 400px;
  }
  .blob1 {
    top: 30%;
    left: 60%;
    @media (max-width: 1080px) {
      top: 10%;
      left: 60%;
      width: 300px;
    }
    @media (max-width: 910px) {
      top: 10%;
      left: 50%;
    }
    @media (max-width: 720px) {
      top: 6%;
      left: 40%;
    }
    @media (max-width: 520px) {
      top: 20%;
      left: 50%;
      width: 150px;
    }
  }
  .blob2 {
    width: 800px;
    top: 10%;
    left: 16%;
    z-index: 2;
    max-height: 98vh;
    @media (max-width: 1080px) {
      top: 20%;
      left: 10%;
    }
    @media (max-width: 910px) {
      top: 10%;
      left: 20%;
      width: 500px;
    }
    @media (max-width: 720px) {
      top: 6%;
      left: 10%;
      width: 400px;
    }
    @media (max-width: 490px) {
      top: 10%;
      left: 20%;
      width: 300px;
    }
    @media (max-width: 400px) {
      top: 10%;
      left: 0%;
      width: 300px;
    }
  }
  .blob3 {
    width: 500px;
    top: 40%;
    left: 5%;
    z-index: 3;
    max-height: 65vh;
    @media (max-width: 1080px) {
      top: 40%;
      left: 6%;
    }
    @media (max-width: 720px) {
      left: 0%;
      width: 300px;
    }
  }
  .blob4 {
    width: 300px;
    top: 70%;
    left: 3%;
    z-index: 3;
    max-height: 35vh;
    @media (max-width: 1080px) {
      top: 70%;
      left: 6%;
    }
    @media (max-width: 720px) {
      top: 50%;
      left: 3%;
      width: 100px;
    }
  }
`;
