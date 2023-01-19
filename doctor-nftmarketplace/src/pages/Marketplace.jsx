import { ethers } from "ethers";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AllItems from "../components/Marketplace/AllItems";
import Create from "../components/Marketplace/Create";
import MyListedItems from "../components/Marketplace/MyListedItems";
import MyPurchases from "../components/Marketplace/MyPurchases";
import MarketplaceAbi from "../contracts/Marketplace.sol/Marketplace.json";
import NFTAbi from "../contracts/NFT.sol/NFT.json";
import NftBg from "../images/nftBg.jpeg";
import NftImg from "../images/nftImg.png";

function Marketplace() {
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState();
  const [marketplace, setMarketplace] = useState();
  const [loading, setLoading] = useState(true);
  const [walletIs, setWalletIs] = useState("walletAvailable");

  const web3Handler = async (e) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", async function (accounts) {
        setAccount(accounts[0]);
        await web3Handler();
      });

      loadContracts(signer);
    } catch (err) {
      setWalletIs("walletNotAvailable");
    }
  };

  const NFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const MarketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // useEffect(() => {
  //   web3Handler();
  // }, []);

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <MarketplaceContainer>
      {loading ? (
        <NotConnectedContainer>
          <NotConnected>
            <NCLeft>
              <HeadContainer>
                <H2>LIVING FORWARD MARKETPLACE</H2>
                <H1>Mint, sell and collect digital items.</H1>
                <Para>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Blanditiis aspernatur tempore delectus. Maiores a consectetur
                  qui accusamus quisquam numquam neque hic, earum doloremque
                  ratione! Aliquid nam, eum odit voluptatibus amet optio odio
                  earum aliquam saepe quia voluptates ex qui ab atque hic
                  perferendis asperiores impedit inventore rerum in tempore?
                  Eveniet.
                </Para>
              </HeadContainer>
              <NoWalletContainer className={walletIs}>
                <H5>
                  Seems like you do not have metamask wallet. Please download{" "}
                  <a href="https://metamask.io/download/">from here</a> and try
                  again
                </H5>
              </NoWalletContainer>
              <Button onClick={web3Handler}>Connect Wallet</Button>
            </NCLeft>
            <NCRight>
              <NftImage src={NftImg} />
            </NCRight>
          </NotConnected>
        </NotConnectedContainer>
      ) : (
        <ConnectedContainer>
          <AllItems nft={nft} marketplace={marketplace} />
          <Create nft={nft} marketplace={marketplace} />
          <MyListedItems
            nft={nft}
            marketplace={marketplace}
            account={account}
          />
          <MyPurchases nft={nft} marketplace={marketplace} account={account} />
        </ConnectedContainer>
      )}
    </MarketplaceContainer>
  );
}

export default Marketplace;

const MarketplaceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Ubuntu", sans-serif;
`;

const NotConnectedContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${NftBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding-top: 90px;
  .walletAvailable {
    display: none;
  }
  .walletNotAvailable {
    display: block;
  }
`;

const NoWalletContainer = styled.div``;

const HeadContainer = styled.div`
  text-align: start;
`;

const NotConnected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const NCLeft = styled.div`
  width: 50%;
  margin-right: 50px;
  @media (max-width: 1000px) {
    width: 100%;
    max-width: 700px;
    margin-right: 0px;
    padding: 20px;
  }
`;

const NCRight = styled.div`
  width: 100%;
  max-width: 448px;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const ConnectedContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom,
    #96c3ea,
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 0)
  );
`;

const NftImage = styled.img`
  width: 80%;
  border-radius: 20px;
`;

const H5 = styled.h5`
  background-color: #860000;
  padding: 20px;
  margin: 10px 0;
`;

const H1 = styled.h1`
  font-size: 50px;
  margin: 0 auto;
  @media (max-width: 425px) {
    font-size: 40px;
  }
`;

const H2 = styled.h2`
  font-size: 30px;
  color: var(--blue);
  @media (max-width: 425px) {
    font-size: 22px;
  }
`;

const Para = styled.p`
  font-size: 20px;
  font-weight: 300;
  margin: 0 auto;
  line-height: 100%;
  @media (max-width: 425px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 5px 50px;
  font-size: 20px;
  background: transparent;
  color: white;
  font-weight: 600;
  border: 3px solid white;
  margin-top: 30px;
  &:hover {
    transition: all ease-in 0.3s;
    background: white;
    color: black;
  }
`;
