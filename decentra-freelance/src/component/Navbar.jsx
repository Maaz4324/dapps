import React, { useState } from "react";
import styled from "styled-components";
import search from "../images/search.svg";
import chat from "../images/chat.svg";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";

function Navbar({ searchState }) {
  const navigate = useNavigate();
  const [connectBtn, setConnectBtn] = useState("Connect");
  const [searchResult, setSearchResult] = useState("");
  // const [searchSend, setSearchSend] = useState("");

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  async function connectWallet() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const abi = SkillSwap.abi;

      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      const skillswap = new ethers.Contract(contractAddress, abi, signer);
      const noOfuser = await skillswap.noOfSellers();
      console.log("working");
      // console.log(noOfuser.toString());
      if (noOfuser.toString() == 0) {
        setConnectBtn("Connected");
      } else {
        for (let index = 1; index <= noOfuser.toString(); index++) {
          const user = await skillswap.sellerProfile(index);
          if (user.seller.toLowerCase() == account[0]) {
            setConnectBtn(
              account[0].substring(0, 4) + "..." + account[0].slice(-3)
            );
          }
        }
      }
    } else {
      alert("please install metamask wallet");
    }
  }

  async function goToSell() {
    if (!window.ethereum) {
      alert("Please download metamask wallet to continue.");
    } else {
      navigate("/selling", { replace: true });
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // console.log(searchResult);
      navigate(searchResult);
      searchState(searchResult);
      localStorage.setItem("searchReq", searchResult);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Logo>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2>SkillSwap</h2>
          </Link>
        </Logo>
        <Search>
          <img src={search} alt="search on skillswap - skill swap" />
          <input
            type="text"
            placeholder="Search for the services"
            onChange={(e) => setSearchResult(e.target.value)}
            value={searchResult}
            onKeyDown={handleKeyDown}
          />
        </Search>
        <Right>
          <img src={chat} alt="chat on skillswap - skill swap" />
          {/* <Link to="/selling"> */}
          <h4
            onClick={goToSell}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Get hired
          </h4>
          {/* </Link> */}
          <button onClick={connectWallet}>{connectBtn}</button>
        </Right>
        <Collapse className="collapse">
          <div id="mySidebar" className="sidebar">
            <a
              // href="javascript:void(0)"
              className="closebtn"
              onClick={closeNav}
            >
              ×
            </a>
            <button className="connect" onClick={connectWallet}>
              {connectBtn}
            </button>
            <a href="#">Get hired</a>
            <a href="#">Chat</a>
          </div>

          <div id="main">
            <button className="openbtn" onClick={openNav}>
              ☰
            </button>
          </div>
        </Collapse>
      </Container>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.section`
  padding: 10px;
  background: transparent;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  border: 2px solid transparentd red;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  padding: 0 40px;
  @media (max-width: 1080px) {
    grid-template-columns: 20% 45% 35%;
    button {
      outline: none;
    }
  }
  @media (max-width: 930px) {
    grid-template-columns: 20% 80%;
    grid-template-rows: auto auto;
    padding: 0 30px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 50% 50%;
  }
`;

const Right = styled.section`
  img {
    width: 30px;
    margin: 0 10px;
    cursor: pointer;
  }
  a {
    color: white;
    margin: 0 10px;
    &:hover {
      color: var(--primary);
    }
  }
  button {
    margin: 0 10px;
    padding: 6px 20px;
    background: var(--primary);
    font-size: 20px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      transition: all 0.3s;
      background: var(--primaryLight);
      color: var(--text);
    }
    @media (max-width: 600px) {
      display: none;
    }
  }

  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
  outline: none;
  border: 0;

  @media (max-width: 930px) {
    display: none;
  }
`;

const Search = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: rgba(123, 123, 123, 0.167);
  backdrop-filter: blur(60px);
  border: 0.6px solid var(--gray);
  border-radius: 10px;
  @media (max-width: 930px) {
    grid-row: 2/3;
    grid-column: 1/3;
    margin-top: 6px;
    background: transparent;
    backdrop-filter: blur(10px);
  }
  img {
    width: 25px;
    color: white;
  }
  input {
    font-size: 20px;
    background: transparent;
    outline: none;
    border: 0;
    width: 100%;
    color: white;
    padding: 2px 4px;
  }
`;

const Logo = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  Link {
    text-decoration: none;
  }
  h2 {
    color: white;
  }
`;

const Collapse = styled.section`
  display: none;
  .sidebar {
    height: 100vh;
    width: 0;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: rgba(14, 13, 22, 0.929);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #ffffff;
    display: block;
    transition: 0.3s;
    display: flex;
    align-items: center;
  }

  .sidebar a:hover {
    color: #f1f1f1;
  }

  .sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  .openbtn {
    font-size: 25px;
    cursor: pointer;
    background-color: #ffffff00;
    color: rgb(255, 255, 255);
    padding: 10px 15px;
    border: none;
  }

  .openbtn:hover {
    background-color: #02020246;
  }

  #main {
    transition: margin-left 0.5s;
    float: right;
  }
  .connect {
    margin: 10px 30px;
    padding: 6px 20px;
    background: var(--primary);
    font-size: 20px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      transition: all 0.3s;
      background: var(--primaryLight);
      color: var(--text);
    }
  }

  @media (max-width: 930px) {
    display: block;
  }
`;
