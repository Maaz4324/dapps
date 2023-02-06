import React from "react";
import styled from "styled-components";
import logo from "../../images/logo1.png";
import bg from "../../images/family.jpg";

function BlogHero() {
  return (
    <BlogHeroContainer>
      <Container>
        <img src={logo} alt="" />
        <button>Jump to blogs</button>
        <Search>
          <input type="text" placeholder="search" />
        </Search>
      </Container>
    </BlogHeroContainer>
  );
}

export default BlogHero;

const BlogHeroContainer = styled.div`
  width: 100%;
  min-height: 70vh;
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 897px;
  height: 100%;
  padding-top: 10vh;
  img {
    width: 100%;
    max-width: 358px;
  }
  button {
    padding: 7px 30px;
    margin: 10px 0;
    background-color: var(--blue);
    border: 1px solid var(--blue);
    color: white;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      transition: all ease-in 0.3s;
      background-color: white;
      box-shadow: 1px 2px 5px black;
      color: black;
    }
  }
`;

const Search = styled.div`
  width: 70%;
  input {
    width: 100%;
    padding: 10px 20px;
    background-color: #dbdbdb;
    border: 0;
    outline: none;
  }
`;
