import React from "react";
import styled from "styled-components";
import Category from "../component/Home/Category";
import HeroSec from "../component/Home/HeroSec";

function Home() {
  return (
    <Wrapper>
      <HeroSec />
      <Category />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section``;
