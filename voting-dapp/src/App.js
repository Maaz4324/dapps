import './App.css';
import {ethers} from 'ethers'
import { useState } from 'react';

function App() {
  const [num, setNum] = useState()
  const [amount, setAmount] = useState()
  
  //Connect to Metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ABI = [
    {
      "inputs": [],
      "name": "getNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "sendEth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_number",
          "type": "uint256"
        }
      ],
      "name": "setNumber",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const signer = provider.getSigner()
  const newContract = new ethers.Contract(contractAddress, ABI, signer);

  async function connectWallet() {
    try{
      
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    } catch(err){
      console.log(err)
    }
  }

  async function storeNumber(){
    await newContract.setNumber(num)
  }

  async function retriveNumber(){
    const storedNum = await contract.getNumber(); 
    console.log(storedNum.toNumber())
  }

  async function sendToken(){
    const sendeth = await newContract.sendEth('0xF2F823bAA7CABe76b35ad97a5039c20D36edd9a2', { value: ethers.utils.parseEther(amount) })
    console.log(sendeth.toString())
  }

  async function getBal(){
    let accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    console.log(balance.toString())
  }

  async function getAddress(){
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0]
    console.log(account.toString())
  }

  return (
    <div className="App">
        <button onClick={getAddress}>Get current address</button>
        <button onClick={connectWallet}>Connect button</button>
        <input type="number" onChange={e => setNum(e.target.value)} defaultValue={num}/>
        <button onClick={storeNumber}>Store number</button>
        <button onClick={retriveNumber}>Get number</button>
        <input type="number" onChange={e => setAmount(e.target.value)} defaultValue={amount}/>
        <button onClick={sendToken}>Send ether</button>
        <button onClick={getBal}>Get Balance</button>
    </div>
  );
}

export default App;
