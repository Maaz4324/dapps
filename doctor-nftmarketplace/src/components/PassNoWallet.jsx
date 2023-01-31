import React from "react";
import styled from "styled-components";
import HomeFoot from "./Home/HomeFoot";

function Marketplace() {
  function downloadWallet() {
    alert("Please download metamask to continue...");
  }
  return (
    <MarketplaceContainer>
      <Container>
        <h1>BUY PASSES TO GET FREE SERVICES</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quis
          obcaecati facilis debitis quidem asperiores. Autem fugit officia
          dolores beatae consectetur minima illo, sed quis maxime quisquam modi,
          tempore at.
        </p>
        <Button onClick={downloadWallet}>Connect Metamask</Button>
        <Pass>
          <PassCard>
            <div>
              <h5>BASIC</h5>
              <h2>3Eth</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo aspernatur iusto aperiam sint esse eveniet accusamus
                vero corrupti distinctio quo minima adipisci doloribus commodi,
                inventore placeat laborum eaque, animi recusandae!
              </p>
              <p>
                <b>for 3 years</b>
              </p>
              <button onClick={downloadWallet}>GET PASS</button>
            </div>
          </PassCard>
          <PassCard>
            <div>
              <h5>Standard</h5>
              <h2>5Eth</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo aspernatur iusto aperiam sint esse eveniet accusamus
                vero corrupti distinctio quo minima adipisci doloribus commodi,
                inventore placeat laborum eaque, animi recusandae!
              </p>
              <p>
                <b>for 5 years</b>
              </p>
              <button onClick={downloadWallet}>GET PASS</button>
            </div>
          </PassCard>
          <PassCard>
            <div>
              <h5>Premium</h5>
              <h2>10Eth</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo aspernatur iusto aperiam sint esse eveniet accusamus
                vero corrupti distinctio quo minima adipisci doloribus commodi,
                inventore placeat laborum eaque, animi recusandae!
              </p>
              <p>
                <b>for lifetime</b>
              </p>
              <button onClick={downloadWallet}>GET PASS</button>
            </div>
          </PassCard>
        </Pass>
      </Container>
      <HomeFoot />
    </MarketplaceContainer>
  );
}

export default Marketplace;

const MarketplaceContainer = styled.div`
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

const Pass = styled.div`
  display: flex;
  align-items: center;
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
  width: 30%;
  cursor: pointer;
  text-align: start;
  color: black;
  margin: 20px 10px;
  @media (max-width: 1047px) {
  }
  @media (max-width: 930px) {
    width: 100%;
    max-width: 465px;
    min-height: 60vh;
  }
  div {
    padding: 20px;
    background-image: linear-gradient(to bottom, #f2f2f2, #bdbdbd);
    &:hover {
      transition: all 0.3s;
      background-image: linear-gradient(to bottom, #b7f9ff, #22c0db);
    }
  }
  h5 {
    font-weight: 600;
  }
  h2 {
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
    border: 1px solid black;
    &:hover {
      transition: all ease-in 0.3s;
      background-color: white;
      box-shadow: 1px 2px 5px black;
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
