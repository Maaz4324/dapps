import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeFoot from "./Home/HomeFoot";
import { Link } from "react-router-dom";
import Nft from "../contracts copy/Pass.sol/Pass.json";
import Market from "../contracts copy/PassMarket.sol/PassMarket.json";
import { ethers } from "ethers";

function Pass() {
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [items, setItems] = useState([]);

  async function connectwallet() {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const nftAbi = Nft.abi;
  const marketAbi = Market.abi;

  const nftAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
  const marketAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  const nft = new ethers.Contract(nftAddress, nftAbi, signer);
  const market = new ethers.Contract(marketAddress, marketAbi, signer);

  const createNFT = async (event) => {
    event.preventDefault();
    if (!price || !amount) return;
    try {
      await nft.mint(amount);
      const tokenCount = await nft.tokenCount();
      await nft.setTokenUri(
        tokenCount.toString(),
        `https://ipfs.io/ipfs/bafybeiao7s6ljdmxcn4f7di5t23iphrq4rxcdx5lrhjevblir57ah65o3q/${tokenCount.toString()}.json`
      );
      console.log("link success");
      await (await nft.setApprovalForAll(market.address, true)).wait();
      const listingPrice = price.toString() * 1000000000000000000;
      await (await market.makeItem(listingPrice.toString(), nftAddress)).wait();
    } catch (error) {
      console.log("ipfs uri upload error: ", error);

      if (error.toString().includes("Ownable: caller is not the owner")) {
        alert("Only owner can call this function.");
      }
    }
  };

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await market.itemCount();
    let items = [];
    for (let i = 0; i < itemCount.toString(); i++) {
      const item = await market.items(i);
      let totalPrice = item.price.toString() / 1000000000000000000;
      const uri = `https://ipfs.io/ipfs/bafybeiao7s6ljdmxcn4f7di5t23iphrq4rxcdx5lrhjevblir57ah65o3q/${i}.json`;
      const response = await fetch(`${uri}`);
      const metadata = await response.json();
      let arr = [];
      let ownersArr = [];
      for (let j = 1; j <= item.owners.toString(); j++) {
        let ownersList = await market.viewOwnerslist(i, j);
        let balance = await nft.balanceOf(ownersList, i);
        arr.push(ownersList + " : " + balance);
      }
      function removeDuplicates(array) {
        ownersArr.push(array.filter((a, b) => array.indexOf(a) === b));
      }
      removeDuplicates(arr);
      items.push({
        totalPrice,
        itemId: i,
        owners: ownersArr[0].length + 1,
        name: metadata.name,
        amount: metadata.amount,
        image: metadata.image.replace("ipfs://", ""),
        description: metadata.discription,
        ownersArray: ownersArr[0],
      });
    }
    setItems(items);
  };

  useEffect(() => {
    loadMarketplaceItems();
    // eslint-disable-next-line
  }, []);

  return (
    <PassContainer>
      <div className="create" style={{ display: "none" }}>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of token"
          defaultValue={amount}
        />
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          defaultValue={price}
        />
        <button onClick={createNFT}>Create NFT</button>
      </div>
      <Container>
        <h1>BUY PASSES TO GET FREE SERVICES</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quis
          obcaecati facilis debitis quidem asperiores. Autem fugit officia
          dolores beatae consectetur minima illo, sed quis maxime quisquam modi,
          tempore at.
        </p>
        <Button onClick={connectwallet}>Connect Metamask</Button>
        <PassC>
          {items.map((item, idx) => (
            <PassCard key={idx}>
              <div
                className="bronze"
                style={{
                  backgroundImage: `url(https://ipfs.io/ipfs/${item.image})`,
                }}
              ></div>
              <h5 className="name">{item.name}</h5>
              <p className="price">{item.price}</p>
              <Link to={`/marketplace/${idx}`} style={{ width: "100%" }}>
                <button>GET PASS</button>
              </Link>
            </PassCard>
          ))}
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
