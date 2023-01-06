import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import token from "./images/token.webp";

function App() {
  const [tokenName, setTokenName] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenId, setTokenId] = useState();
  const [tokensetPrice, setTokenSetPrice] = useState();
  const [buyTokenPrice, setBuyTokenPrice] = useState();
  const [tokenArray, setTokenArray] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_newPrice",
          type: "uint256",
        },
      ],
      name: "buyToken",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tokens",
      outputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewTokens",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          internalType: "struct TokenMarketplace.token[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const signer = provider.getSigner();
  const newContract = new ethers.Contract(contractAddress, ABI, signer);

  useEffect(() => {
    async function getTokens() {
      try {
        let tokens = await newContract.viewTokens();
        // console.log(tokens);
        for (let i = 0; i < tokens.length; i++) {
          const tokenArr = [
            { name: tokens[i].name },
            { symbol: tokens[i].symbol },
            { price: tokens[i].price.toString() },
            { owner: tokens[i].owner },
          ];
          setTokenArray((oldArr) => [...oldArr, tokenArr]);
          console.log(tokenArray);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTokens();
  }, []);

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    } catch (err) {
      console.log(err);
    }
  }

  async function mintToken() {
    let minted = await newContract.mint(tokenName, tokenPrice, tokenSymbol);
    console.log(minted);
  }

  async function buyTokens() {
    try {
      let tokens = await newContract.viewTokens();
      let bought = await newContract.buyToken(tokenId, tokensetPrice, {
        value: ethers.utils.parseEther(tokens[tokenId].price.toString()),
      });
      setBuyTokenPrice(tokensetPrice);
      console.log(bought);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="connect_container">
        <button onClick={connectWallet}>Connect to metamask</button>
      </div>
      <div className="mint_container">
        <h1>Mint your own token</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setTokenName(e.target.value)}
          defaultValue={tokenName}
        />
        <input
          type="text"
          placeholder="Price"
          onChange={(e) => setTokenPrice(e.target.value)}
          defaultValue={tokenPrice}
        />
        <input
          type="text"
          placeholder="Symbol"
          onChange={(e) => setTokenSymbol(e.target.value)}
          defaultValue={tokenSymbol}
        />
        <button onClick={mintToken}>Mint token</button>
      </div>
      {/* <button onClick={getTokens}>view tokens</button> */}
      <div className="view_container">
        {tokenArray.map((items, index) => (
          <div className="token_card" key={index}>
            <img src={token} alt="not found" />
            {items.map((tokenslist) => (
              <div key={tokenslist.owner}>
                <h3>{tokenslist.name}</h3>
                <h5>{tokenslist.price}</h5>
                <h5>{tokenslist.symbol}</h5>
                <h5 className="address">{tokenslist.owner}</h5>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="buy_container">
        <h1>Buy token</h1>
        <input
          type="text"
          placeholder="id"
          onChange={(e) => setTokenId(e.target.value)}
          defaultValue={tokenId}
        />
        <input
          type="text"
          placeholder="set price"
          onChange={(e) => setTokenSetPrice(e.target.value)}
          defaultValue={tokensetPrice}
        />

        <button onClick={buyTokens}>Buy tokens</button>
      </div>
    </div>
  );
}

export default App;
