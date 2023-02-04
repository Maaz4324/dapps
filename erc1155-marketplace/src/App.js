import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Nft from "./contracts/AwesomeGame.sol/AwesomeGame.json";
import Market from "./contracts/AwesomeGameMarket.sol/AwesomeGameMarket.json";

function App() {
  const [connect, setConnect] = useState("Connect wallet");
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [items, setItems] = useState([]);

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

  const nftAddress = "0x998abeb3E57409262aE5b751f60747921B33613E";
  const marketAddress = "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49";

  const nft = new ethers.Contract(nftAddress, nftAbi, signer);
  const market = new ethers.Contract(marketAddress, marketAbi, signer);

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `69ddf0c1ea1284373b8c`,
            pinata_secret_api_key: `d219acbd820dccb31fe547c00a03d9423907e62118337b2189d24a657514140b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        setImage(ImgHash);
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const createNFT = async (event) => {
    event.preventDefault();
    if (!image || !price || !name) return;
    try {
      var data = JSON.stringify({ image, price, name });
      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          pinata_api_key: `69ddf0c1ea1284373b8c`,
          pinata_secret_api_key: `d219acbd820dccb31fe547c00a03d9423907e62118337b2189d24a657514140b`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log("error");
      const res = await axios(config);
      mintThenList(res);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (res) => {
    try {
      const uri = `ipfs://${res.data.IpfsHash}`;
      console.log(uri);

      // approve marketplace to spend nft
      await (await nft.setApprovalForAll(market.address, true)).wait();
      console.log("working1");
      // add nft to marketplace
      const listingPrice = price.toString() * 1000000000000000000;
      console.log(listingPrice.toString());
      await (
        await market.makeItem(uri, listingPrice.toString(), nft.address)
      ).wait();
    } catch (err) {
      console.log(err);
    }
  };

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await market.itemCount();
    console.log(itemCount.toString());
    let items = [];
    for (let i = 0; i < itemCount.toString(); i++) {
      const item = await market.items(i);
      console.log(item);
      // get uri url from nft contract
      let totalPrice = item.price.toString();
      const uri = await item.uri;
      const hash = uri.replace("ipfs://", "");
      console.log(uri);

      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
      const metadata = await response.json();
      // Add item to items array
      items.push({
        totalPrice,
        itemId: i,
        owners: item.owners.toString(),
        name: metadata.name,
        image: metadata.image.replace("ipfs://", ""),
      });
    }
    setItems(items);
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <div className="App">
      <button onClick={connectwallet}>{connect}</button>
      <div className="create">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          defaultValue={name}
        />
        <input
          type="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Prie"
          defaultValue={price}
        />
        <input type="file" onChange={uploadToIPFS} />
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
                  <h1>{item.name}</h1>
                  <h2>{item.owners}</h2>
                </div>
                <button>
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
