import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Nft from "./contracts/AwesomeGame.sol/AwesomeGame.json";
import Market from "./contracts/AwesomeGameMarket.sol/AwesomeGameMarket.json";

function App() {
  const [connect, setConnect] = useState("Connect wallet");
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [items, setItems] = useState([]);
  const [holdAmount, setHoldAmount] = useState();

  async function connectwallet() {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setConnect("Connected");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const nftAbi = Nft.abi;
  const marketAbi = Market.abi;

  const nftAddress = "0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154";
  const marketAddress = "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575";

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
        `https://ipfs.io/ipfs/bafybeiervg2zyavw3lc5tg3pu5wr4dwxxclzmcxzfgw3br52suvrzercme/${tokenCount.toString()}.json`
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

      let totalPrice = item.price.toString();
      const uri = `https://ipfs.io/ipfs/bafybeiervg2zyavw3lc5tg3pu5wr4dwxxclzmcxzfgw3br52suvrzercme/${i}.json`;

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
        image: metadata.image.replace("ipfs://", ""),
        ownersArray: ownersArr[0],
      });
    }
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    console.log(item.itemId);
    console.log(nft.address);
    console.log(item.totalPrice);
    let value = item.totalPrice / 1000000000000000000;
    console.log(value);
    console.log(holdAmount);
    let totalCost = value * holdAmount;
    await (
      await market.PurchaseItem(item.itemId, nftAddress, holdAmount, {
        value: ethers.utils.parseEther(totalCost.toString()),
      })
    ).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <div className="App">
      <h1>ERC 1155</h1>
      <button onClick={connectwallet}>{connect}</button>

      <div className="create">
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

      <div className="display">
        <div className="px-5 container">
          {items.map((item, idx) => (
            <div key={idx}>
              <div className="container">
                <img
                  src={`https://ipfs.io/ipfs/${item.image}`}
                  alt="not available"
                />
                <div>
                  <h1>Name - {item.name}</h1>
                  <h2>{item.owners} owners</h2>
                  <div>
                    {item.ownersArray.map((ownerArr, index) => (
                      <p key={index}>{ownerArr}</p>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  onChange={(e) => setHoldAmount(e.target.value)}
                  placeholder="Amount"
                  defaultValue={holdAmount}
                />
                <button onClick={() => buyMarketItem(item)}>
                  Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
