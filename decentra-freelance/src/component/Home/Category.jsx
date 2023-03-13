import React from "react";
import styled from "styled-components";
import { categoryData } from "../../assets/category";
import { useNavigate } from "react-router-dom";
import card1 from "../../images/card1.jpg";

function Category() {
  const navigate = useNavigate();

  function handleRedirect(link) {
    if (!window.ethereum) {
      alert("Please download metamask wallet to continue.");
    } else {
      navigate(link);
    }
  }
  return (
    <Wrapper>
      <Container>
        <h1>Browse talent by category</h1>
        <h5>
          Welcome to our full stop shop for NFT creation, where you can find
          everything you need to launch your own unique digital art/ asset
          collection!{" "}
        </h5>
        <CategoryContainer>
          {categoryData.map((data, idx) => (
            <Card key={idx} onClick={() => handleRedirect(data.link)}>
              <img src={data.img} alt="" />
              <h3>{data.head}</h3>
              <p>
                <span>{data.text}</span>
              </p>
              <h4>See more</h4>
            </Card>
          ))}
        </CategoryContainer>
      </Container>
    </Wrapper>
  );
}

export default Category;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: var(--black);
  padding-top: 40px;
`;
const Container = styled.section`
  min-height: 100vh;
  width: 90%;
  max-width: 1147px;
  margin: 0 auto;
  h1 {
    font-size: 50px;
    font-weight: 900;
  }
  h5 {
    font-size: 20px;
  }
`;

const Card = styled.section`
  display: grid;

  flex-direction: column;
  padding: 40px;
  background: #1d1d21;
  border-radius: 20px;
  border: 2px solid var(--gray);
  cursor: pointer;
  background: url({card1});
  &:hover {
    transition: all 0.3s;
    background: #17171a;
  }
  h3 {
    font-size: 30px;
    margin: auto 0;
    grid-column: 1/2;
    grid-row: 1/2;
  }

  h4 {
    color: white;
    grid-column: 1/3;
    grid-row: 3/4;
    margin-top: 10px;
    text-decoration: underline;
  }
  span {
    font-size: 20px;
    color: var(--darkText);
  }
  img {
    fill: var(--primary);
    height: fit-content;
    grid-column: 2/3;
    grid-row: 1/2;
    width: 60px;
    margin: auto;
    @media (max-width: 320px) {
      width: 40px;
    }
  }
`;

const CategoryContainer = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  padding: 30px 0;
  @media (max-width: 670px) {
    grid-template-columns: auto;
  }
`;
