import React from "react";
import styled from "styled-components";
import { aboutData } from "../../assets/about";

function About() {
  return (
    <Wrapper>
      <Container>
        <h1>Why SkillSwap</h1>
        <h5>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eaque
          necessitatibus nemo quisquam laboriosam praesentium assumenda. Earum,
          necessitatibus aliquid.
        </h5>
        <Content>
          {aboutData.map((data, idx) => (
            <Card key={idx}>
              <h3>{data.head}</h3>
              <p>
                <span>{data.text}</span>
              </p>
            </Card>
          ))}
        </Content>
      </Container>
    </Wrapper>
  );
}

export default About;

const Wrapper = styled.section`
  width: 100%;
  /* min-height: 100vh; */
  background: linear-gradient(to right, #111118, #161727, #1a1c35);
  padding-top: 40px;
`;
const Container = styled.section`
  width: 90%;
  max-width: 1147px;
  margin: 0 auto;
  padding: 40px 0;
  h1 {
    font-size: 50px;
    font-weight: 900;
    z-index: 999;
  }
  h5 {
    z-index: 999;
    font-size: 18px;
    font-weight: 100;
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  padding: 50px 0;
  @media (max-width: 990px) {
    grid-template-columns: auto;
  }
`;

const Card = styled.section`
  z-index: 999;
  /* border: 2px solid green; */
  min-height: 20vh;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #131322;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  h3 {
    color: var(--primary);
  }
  @media (max-width: 990px) {
    width: 90%;
    max-width: 495px;
    margin: 0 auto;
  }
`;
