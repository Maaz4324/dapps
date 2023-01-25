import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import specialPatient from "../images/specialPatient.png";
import expertise from "../images/expertise.webp";

function OfficeHour() {
  return (
    <Container>
      <Right>
        <Link to="/special">
          <ImgContainer>
            <img src={specialPatient} alt="" />
          </ImgContainer>
        </Link>
        <OfficeHourContainer>
          <H4>OFFICE HOURS</H4>
          <HourLine></HourLine>
          <H5>Monday</H5>
          <Time>
            10:00am - 1:00pm
            <br /> 10:00am - 1:00pm
          </Time>
          <HourLine></HourLine>
          <H5>Tuesday</H5>
          <Time>
            10:00am - 1:00pm
            <br /> 10:00am - 1:00pm
          </Time>
          <HourLine></HourLine>
          <H5>Wednesday</H5>
          <Time>By Appointment Only</Time>
          <HourLine></HourLine>
          <H5>Thursday</H5>
          <Time>
            10:00am - 1:00pm
            <br /> 10:00am - 1:00pm
          </Time>
          <HourLine></HourLine>
          <H5>Friday</H5>
          <Time>By Appointment Only</Time>
          <HourLine></HourLine>
          <H5>Saturday</H5>
          <Time>By Appointment Only</Time>
        </OfficeHourContainer>
        <RightAboutContainer>
          <RightImg className="expertise" src={expertise} />
        </RightAboutContainer>
      </Right>
    </Container>
  );
}

export default OfficeHour;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  width: 70%;
  text-align: center;
  @media (max-width: 890px) {
    width: 60%;
  }
`;
const RightAboutContainer = styled.div`
  width: 100%;
`;

const OfficeHourContainer = styled.div`
  text-align: center;
  padding: 30px 0;
`;

const HourLine = styled.div`
  border-bottom: 1px solid var(--lightgray);
  width: 60%;
  margin: 0px auto;
`;

const Time = styled.p`
  color: var(--gray);
`;

const H5 = styled.h5`
  font-size: 17px;
  color: var(--headgray);
`;

const RightImg = styled.img`
  width: 60%;
`;
const H4 = styled.h4`
  margin: 20px 0;
  color: var(--blue);
`;

const ImgContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;
