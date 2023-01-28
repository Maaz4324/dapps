import React from "react";
import styled from "styled-components";
import TourCarousel from "../../components/TourCarousel";
import HomeFoot from "../../components/Home/HomeFoot";
import Fade from "react-reveal/Fade";

function Tour() {
  return (
    <TourContainer>
      <Container>
        <Fade>
          <H1>NEW LEAF CHIROPRACTIC OFFICE TOUR</H1>
          <TourCarousel />
        </Fade>
      </Container>
      <HomeFoot />
    </TourContainer>
  );
}

export default Tour;

const TourContainer = styled.div`
  padding-top: 80px;
  @media (max-width: 990px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  @media (max-width: 1047px) {
    padding: 0 10px;
  }
`;

const H1 = styled.h1`
  text-align: center;
`;
