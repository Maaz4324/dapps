import React from "react";
import styled from "styled-components";
import search from "../images/search.svg";
import chat from "../images/chat.svg";

function Navbar() {
  return (
    <Wrapper>
      <Container>
        <Logo>
          <h2>SkillSwap</h2>
        </Logo>
        <Search>
          <img src={search} alt="search on skillswap - skill swap" />
          <input type="text" placeholder="Search for the services" />
          {/* <button>categories</button> */}
        </Search>
        <Right>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            className="search-svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#ffffff"
                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
              ></path>
            </g>
          </svg>
          <img src={chat} alt="chat on skillswap - skill swap" />
          <a href="#">
            <h4>Get hired</h4>
          </a>
          <button>Connect</button>
        </Right>
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
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  @media (max-width: 1080px) {
    grid-template-columns: 20% 45% 35%;
    button {
      outline: none;
    }
  }
  @media (max-width: 930px) {
    grid-template-columns: 20% 80%;
    padding: 0 30px;
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

  .search-svg {
    display: none;
    @media (max-width: 930px) {
      display: block;
    }
  }
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
  outline: none;
  border: 0;
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
    display: none;
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
`;
