import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import pass from "../contracts/Pass.sol/Pass.json";

function Marketplace() {
  const [currentAcc, setCurrentAcc] = useState();
  const [alreadyBuyer, setAlreadyBuyer] = useState();
  const [passId, setPassId] = useState();

  const web3Handler = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAcc(account[0]);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const abi = pass.abi;

  const passContract = new ethers.Contract(contractAddress, abi, signer);

  async function purchasePass(_id) {
    try {
      const passPrice = await passContract.passes(_id);
      await passContract.buyPass(_id, {
        value: ethers.utils.parseEther(passPrice.toString()),
      });
    } catch (error) {
      if (error.toString().includes("You aleady have pass")) {
        alert("You're already holding a pass. Please wait until it expires.");
      }
      if (error.toString().includes("user rejected transaction")) {
        alert(
          "You stopped the purchase. Please click on the get pass button again to continue."
        );
      } else {
        alert("Facing error puchasing the pass.");
      }
    }
  }

  useEffect(() => {
    async function showBuyerPass() {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAccPass = await passContract.buyerPass(account[0]);
        console.log(currentAccPass.toString());
        if (currentAccPass.toString() === 0) {
          setAlreadyBuyer(false);
        }
        if (currentAccPass.toString() == 1) {
          setAlreadyBuyer(true);
          setPassId(" a basic pass holder for 3 years");
        }
        if (currentAccPass.toString() == 2) {
          setAlreadyBuyer(true);
          setPassId(" a standard pass holder for 5 years");
        }
        if (currentAccPass.toString() == 3) {
          setAlreadyBuyer(true);
          setPassId(" a premium pass holder for lifetime");
        }
      } catch (error) {
        console.log(error);
      }
    }
    showBuyerPass();
    // eslint-disable-next-line
  }, []);

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
        {alreadyBuyer ? (
          <h6>You're already {passId}, thanks :).</h6>
        ) : (
          <div></div>
        )}
        <Button onClick={web3Handler}>Connect Metamask</Button>
        <Pass>
          <PassCard>
            <div className="bronze"></div>
            <h5 className="name">Bronze</h5>
            <p className="price">3Eth</p>
            <button onClick={() => purchasePass(1)}>GET PASS</button>
          </PassCard>
          <PassCard>
            <div className="silver"></div>
            <h5 className="name">Silver</h5>
            <p className="price">5Eth</p>
            <button onClick={() => purchasePass(2)}>GET PASS</button>
          </PassCard>
          <PassCard>
            <div className="gold"></div>
            <h5 className="name">Gold</h5>
            <p className="price">10Eth</p>
            <button onClick={() => purchasePass(3)}>GET PASS</button>
          </PassCard>
        </Pass>
      </Container>
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
    min-height: 30vh;
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
