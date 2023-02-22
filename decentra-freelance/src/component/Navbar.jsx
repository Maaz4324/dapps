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
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 30% 40% 30%;
`;

const Right = styled.section`
  img {
    width: 30px;
    margin: 0 4px;
  }
  a {
    color: white;
    margin: 0 4px;
  }
  button {
    margin: 0 4px;
    padding: 6px 20px;
    background: var(--primary);
  }
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
`;

const Search = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 20px;
  background: rgba(123, 123, 123, 0.167);
  backdrop-filter: blur(60px);
  img {
    width: 32px;
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
  border-radius: 10px;
`;

const Logo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;
