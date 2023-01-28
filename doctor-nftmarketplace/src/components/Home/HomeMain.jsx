import React from "react";
import styled from "styled-components";
import bg1 from "../../images/family.jpg";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

function HomeMain() {
  return (
    <HomeMainContainer>
      <MainHead>
        <Fade cascade>
          <H2>GET THE LIFE</H2>
        </Fade>
        <YouHead>
          {/* <Fade cascade> */}
          <Line></Line>
          <H3>you</H3>
          <Line></Line>
          {/* </Fade> */}
        </YouHead>
        <Fade cascade>
          <H1>DESERVE</H1>
        </Fade>
        <Link to="/special">
          <Button>NEW PATIENT SPECIAL OFFER</Button>
        </Link>
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
  font-size: 70px;
  @media (max-width: 480px) {
    font-size: 60px;
  }
  @media (max-width: 370px) {
    font-size: 40px;
  }
`;

const H1 = styled.h1`
  font-size: 80px;
  @media (max-width: 480px) {
    font-size: 70px;
  }
  @media (max-width: 370px) {
    font-size: 50px;
  }
`;

const H3 = styled.h3`
  font-size: 50px;
  font-family: "Cedarville Cursive", cursive;
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
  border-top: 3px solid white;
  width: 20%;
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  font-size: 25px;
  font-weight: bold;
  color: white;
  &:hover {
    transition: all ease-in 0.3s;
    background-color: white;
    box-shadow: 1px 2px 5px black;
    color: black;
  }
`;
