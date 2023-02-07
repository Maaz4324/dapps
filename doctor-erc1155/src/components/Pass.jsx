import React from "react";
import styled from "styled-components";
import HomeFoot from "./Home/HomeFoot";
import { Link } from "react-router-dom";

function Pass() {
  function downloadWallet() {
    alert("Please download metamask to continue...");
  }
  return (
    <PassContainer>
      <Container>
        <h1>BUY PASSES TO GET FREE SERVICES</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quis
          obcaecati facilis debitis quidem asperiores. Autem fugit officia
          dolores beatae consectetur minima illo, sed quis maxime quisquam modi,
          tempore at.
        </p>
        <Button onClick={downloadWallet}>Connect Metamask</Button>
        <PassC>
          <PassCard>
            <div className="bronze"></div>
            <h5 className="name">Bronze</h5>
            <p className="price">3Eth</p>
            <Link to="/marketplace/0" style={{ width: "100%" }}>
              <button>GET PASS</button>
            </Link>
          </PassCard>
          <PassCard>
            <div className="silver"></div>
            <h5 className="name">Silver</h5>
            <p className="price">5Eth</p>
            <Link to="/marketplace/1" style={{ width: "100%" }}>
              <button>GET PASS</button>
            </Link>
          </PassCard>
          <PassCard>
            <div className="gold"></div>
            <h5 className="name">Gold</h5>
            <p className="price">10Eth</p>
            <Link to="/marketplace/2" style={{ width: "100%" }}>
              <button>GET PASS</button>
            </Link>
          </PassCard>
        </PassC>
      </Container>
      <HomeFoot />
    </PassContainer>
  );
}

export default Pass;

const PassContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 90px;
  @media (max-width: 991px) {
    padding-top: 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  h1 {
    color: var(--headgray);
  }
  p {
    width: 80%;
    margin: 0 auto;
    @media (max-width: 930px) {
      width: 100%;
    }
  }
  h6 {
    font-size: 20px;
    margin: 10px 0;
    color: var(--blue);
  }
`;

const PassC = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  justify-content: center;
  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

const PassCard = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  text-align: start;
  color: black;
  margin: 20px 10px;
  background-color: #f4f4f4;
  box-shadow: 1px 2px 5px black;
  @media (max-width: 930px) {
    width: 100%;
    max-width: 465px;
    min-height: 60vh;
  }
  div {
    width: 100%;
    height: 30vh;
    margin-bottom: 14px;
  }
  .bronze {
    background-image: url("https://ipfs.io/ipfs/bafkreieyx66fghcn5wsa7cleipl4y7xcvcwphd4ecrkszxpf4zmqedj7au");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
  .silver {
    background-image: url("https://ipfs.io/ipfs/bafkreiafcqxslpyd36zw3wvfimf5avetwp4rhqq5rqx6ms77isq6cx5seq");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
  .gold {
    background-image: url("https://ipfs.io/ipfs/bafkreibbxgbimygnehguwxsforc4cgun5wmky2odqqdvzpkcl3cshikwee");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
  .price {
    color: black;
    font-size: 22px;
    margin: 0 10px;
  }
  .name {
    font-size: 16px;
    margin: 0 10px;
  }
  h5 {
    font-weight: 600;
  }
  p {
    line-height: 130%;
    color: #4c4c4c;
    width: 100%;
    margin: 5px 0;
  }
  button {
    padding: 10px 20px;
    background-color: black;
    font-size: 16px;
    color: white;
    width: 100%;
    margin: 10px 0;
    border: 0px;
    margin-bottom: 0;
    &:hover {
      transition: all ease-in 0.3s;
      background-color: #f4f4f4;
      color: black;
    }
  }
`;

const Button = styled.button`
  padding: 7px 20px;
  font-size: 20px;
  border: 0;
  margin-top: 20px;
  background-image: linear-gradient(to right, #b7f9ff, #22c0db);
  &:hover {
    transition: all 0.3s;
    background-image: linear-gradient(to right, #f2f2f2, #bdbdbd);
  }
`;
