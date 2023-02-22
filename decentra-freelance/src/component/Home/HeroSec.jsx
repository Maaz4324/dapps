import React from "react";
import styled from "styled-components";
import blob1 from "../../images/blob1.svg";
import blob2 from "../../images/blob2.svg";
import blob3 from "../../images/blob3.svg";
import blob4 from "../../images/blob4.svg";

function HeroSec() {
  return (
    <Wrapper>
      <h1>Decentralized</h1>
      <h1 className="outline">Freelancing</h1>
      <h5>
        Start your freelancing journey from here or hire someone cuz we help you
        build the future.
      </h5>
      <button>Start Now</button>
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
  background: var(--bg);
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
  }
  h5 {
    z-index: 100;
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
  }
`;
