import React from "react";
import styled from "styled-components";
import HomeFoot from "../../components/Home/HomeFoot";
import OfficeHour from "../../components/OfficeHour";

function Testimonials() {
  return (
    <TestimonialContainer>
      <Container>
        <Left>
          <h1>CHIROPRACTIC TESTIMONIALS</h1>
          <VideoContainer>
            <iframe
              width="330"
              height="180"
              src="https://www.youtube.com/embed/ZtKYfSFiRAI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="330"
              height="180"
              src="https://www.youtube.com/embed/Zs7TpbjIh8E"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="330"
              height="180"
              src="https://www.youtube.com/embed/Zs7TpbjIh8E"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="330"
              height="180"
              src="https://www.youtube.com/embed/Zs7TpbjIh8E"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </VideoContainer>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </TestimonialContainer>
  );
}

export default Testimonials;

const TestimonialContainer = styled.div`
  padding-top: 70px;
  @media (max-width: 990px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1100px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  iframe {
    margin: 5px;
    @media (max-width: 400px) {
      width: 280px;
      height: 160px;
    }
  }
`;
