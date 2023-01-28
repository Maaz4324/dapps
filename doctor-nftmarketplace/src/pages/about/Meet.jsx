import React from "react";
import styled from "styled-components";
import AboutDocs from "../../components/AboutDocs";
import HomeFoot from "../../components/Home/HomeFoot";
import MeetAccor from "../../components/MeetAccor";
import OfficeHour from "../../components/OfficeHour";
import Fade from "react-reveal/Fade";

function Meet() {
  const accordionData = [
    {
      title: "OUR MISSION",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`,
    },
    {
      title: "OUR MISSION",
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
      reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
      quaerat iure quos dolorum accusantium ducimus in illum vero commodi
      pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
      quidem maiores doloremque est numquam praesentium eos voluptatem amet!
      Repudiandae, mollitia id reprehenderit a ab odit!`,
    },
    {
      title: "OUR TECHNIQUE",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
    {
      title: "OUR SPECIALITY",
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
  ];

  return (
    <MeetContainer>
      <Container>
        <Left>
          <Top>
            <Fade big cascade>
              <H1>MEET THE TEAM</H1>
              <Para>
                Drs. Sherry and Richard met in their first day of orientation in
                graduate school and felt led to one another to work towards
                God's purpose for their lives, together. They married on July
                11th, 2014 and are so excited to work together to achieve their
                passion of working with all the families in the community,
                beginning with yours!
                <br />
                <br />
                At New Leaf Chiropractic, we are on a mission to restore the
                health of our community through Specific, Scientific,
                Neurologically based, Chiropractic care.
                <br />
                <br />
                Our goal is to deliver a natural, drug free answer to common
                health issues that plague our community. We believe that
                everyone has the right to be healthy and we want to see everyone
                reach their full, God-given, health potential.
                <br />
                <br />
                We utilize state-of-the-art technology, along with the most
                cutting-edge chiropractic techniques to provide you, your
                family, and the community with a natural, drug-free approach to
                health issues.
              </Para>
            </Fade>

            <AboutAccordion>
              {accordionData.map(({ title, content }) => (
                <MeetAccor title={title} content={content} />
              ))}
            </AboutAccordion>
          </Top>
          <Middle>
            <hr />
            <Fade left>
              <AboutDocs />
            </Fade>
            <hr />
            <Fade left>
              <AboutDocs />
            </Fade>
            <hr />
            <Fade left>
              <AboutDocs />
            </Fade>
            <hr />
            <Fade left>
              <AboutDocs />
            </Fade>
            <hr />
            <Fade left>
              <AboutDocs />
            </Fade>
          </Middle>
          <Bottom></Bottom>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </MeetContainer>
  );
}

export default Meet;

const MeetContainer = styled.div`
  padding-top: 90px;
  @media (max-width: 990px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  width: 70%;
  @media (max-width: 890px) {
    width: 100%;
    padding-right: 0px;
  }
`;

const Bottom = styled.div``;

const Middle = styled.div``;

const Top = styled.div``;

const AboutAccordion = styled.div``;

const H1 = styled.h1`
  font-weight: 800;
  color: var(--headgray);
  margin-bottom: 30px;
`;

const Para = styled.p`
  color: var(--gray);
`;
