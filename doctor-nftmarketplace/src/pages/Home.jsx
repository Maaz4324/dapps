import React from "react";
import styled from "styled-components";
import HomeMain from "../components/Home/HomeMain";
import Illness from "../components/Home/Illness";
import Chiropractor from "../components/Home/Chiropractor";
import HomeMiddle from "../components/Home/HomeMiddle";
import HomeFoot from "../components/Home/HomeFoot";

function Home() {
  return (
    <HomeContainer>
      <HomeMain />
      <Illness />
      <Chiropractor />
      <HomeMiddle />
      <HomeFoot />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div``;
