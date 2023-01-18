import React from "react";
import styled from "styled-components";
import bg1 from "../../images/family.jpg";

function HomeMain() {
  return (
    <HomeMainContainer>
      <MainHead>
        <H2>GET THE LIFE</H2>
        <YouHead>
          <Line></Line>
          <H3>you</H3>
          <Line></Line>
        </YouHead>
        <H1>DESERVE</H1>
        <Button>NEW PATIENT SPECIAL OFFER</Button>
      </MainHead>
    </HomeMainContainer>
  );
}

export default HomeMain;

const HomeMainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bg1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const MainHead = styled.div`
  width: 100%;
  max-width: 670px;
  text-align: center;
  margin-left: 10%;
  color: white;
  @media (max-width: 800px) {
    margin: 0;
  }
  @media (max-width: 480px) {
    margin: 0;
  }
`;

const H2 = styled.h2`
  font-size: 80px;
  @media (max-width: 480px) {
    font-size: 60px;
  }
  @media (max-width: 370px) {
    font-size: 40px;
  }
`;

const H1 = styled.h1`
  font-size: 100px;
  @media (max-width: 480px) {
    font-size: 70px;
  }
  @media (max-width: 370px) {
    font-size: 50px;
  }
`;

const H3 = styled.h3`
  font-size: 70px;
  @media (max-width: 480px) {
    font-size: 50px;
  }
  @media (max-width: 370px) {
    font-size: 30px;
  }
`;

const YouHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  border-top: 1px solid white;
  width: 30%;
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  &:hover {
    transition: all ease-in 0.3s;
    background-color: white;
    box-shadow: 1px 2px 5px black;
  }
`;
