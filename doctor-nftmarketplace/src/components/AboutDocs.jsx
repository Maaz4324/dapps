import React, { useState } from "react";
import richard from "../images/richard.jpg";
import styled from "styled-components";
import plus from "../images/plus.png";
import minus from "../images/minus.png";

function AboutDocs() {
  const [isActive, setIsActive] = useState(false);

  const accordionData = {
    title: "READ MORE",
    content: `Having suffered from back pain at a young age he had his first experience with chiropractic care at 11 years old. Although his pain improved, it was not until he met a neurologically based chiropractor that he realized the importance of chiropractic and a proper functioning nervous system. Having witnessed the amazing results with this specialty it was not long before he began his journey to becoming a neurologically based chiropractor himself.
    His passion led him to graduate from his Doctorate of Chiropractic Physician Degree with honors. He is Advanced Certified in Torque Release Technique, one of the most researched chiropractic techniques available to date. As a leader in the full spine club he was able to hone his skills in hands on adjusting making him proficient in instrument as well as manual adjusting. He has taken several electives in Pediatric Diagnoses & Adjusting making him qualified to serve practice members of all ages.`,
  };

  const { title, content } = accordionData;

  return (
    <AboutDocContainer>
      <Container>
        <Top>
          <Left>
            <img src={richard} alt="" />
          </Left>
          <Right>
            <H3>CHIROPRACTOR</H3>
            <H1>RICHARD ROSADO D.C.</H1>
            <Bio>
              Dr. Richard Rosado has a mission to improve the health of his
              community one family at a time through the vehicle of
              neurologically based and corrective care chiropractic. His goal is
              to help families achieve their God-given optimal health and
              potential allowing them to reach their sole purpose in life.
            </Bio>
          </Right>
        </Top>
        <ReadMore>
          <Accordion className="accordion">
            <AccordionItem className="accordion-item">
              <AccordionTitle
                className="accordion-title"
                onClick={() => setIsActive(!isActive)}
              >
                <h5>{title}</h5>
                <PMSign>
                  {isActive ? (
                    <img src={minus} alt="" />
                  ) : (
                    <img src={plus} alt="" />
                  )}
                </PMSign>
              </AccordionTitle>
              {isActive && (
                <Content className="accordion-content">
                  <p>{content}</p>
                </Content>
              )}
            </AccordionItem>
          </Accordion>
        </ReadMore>
      </Container>
    </AboutDocContainer>
  );
}

export default AboutDocs;

const AboutDocContainer = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 70%;
  padding-right: 30px;
  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 00px;
  }
  img {
    width: 100%;
    border-radius: 50%;
    @media (max-width: 700px) {
      margin-bottom: 40px;
      width: 100%;
      max-width: 350px;
    }
  }
`;

const Right = styled.div`
  width: 100%;
`;

const ReadMore = styled.div`
  width: 100%;
  .accordion {
    width: 100%;
  }
`;

const Accordion = styled.div`
  margin: 5px 0;
`;

const AccordionItem = styled.div`
  border: 0;
`;

const PMSign = styled.div`
  padding: 4px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #f6f6f6;
  padding: 2px 20px;
  h5 {
    font-size: 20px;
    font-weight: 700;
    color: var(--headgray);
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 10px;
`;

const H3 = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

const H1 = styled.h1`
  font-size: 23px;
  font-weight: 700;
`;

const Bio = styled.p``;
