import React from "react";
import styled from "styled-components";
import backpain from "../../images/backpain.jpg";
import HomeFoot from "../Home/HomeFoot";

function BlogBottom() {
  return (
    <BlogBottomContainer>
      <Container>
        <h1>NEW LEAF INSPIRED LIVING BLOG</h1>
        <BlogCards>
          <Card>
            <img src={backpain} alt="" />
            <h6>Baby formula</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              asperiores expedita, in ullam laborum libero quibusdam cupiditate,
              veritatis minus velit possimus esse molestiae eos dicta
              dignissimos numquam deserunt earum voluptatum?
            </p>
          </Card>
          <Card>
            <img src={backpain} alt="" />
            <h6>Baby formula</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              asperiores expedita, in ullam laborum libero quibusdam cupiditate,
              veritatis minus velit possimus esse molestiae eos dicta
              dignissimos numquam deserunt earum voluptatum?
            </p>
          </Card>
          <Card>
            <img src={backpain} alt="" />
            <h6>Baby formula</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              asperiores expedita, in ullam laborum libero quibusdam cupiditate,
              veritatis minus velit possimus esse molestiae eos dicta
              dignissimos numquam deserunt earum voluptatum?
            </p>
          </Card>
        </BlogCards>
      </Container>
      <HomeFoot />
    </BlogBottomContainer>
  );
}

export default BlogBottom;

const BlogBottomContainer = styled.div`
  padding: 60px 0;
  margin-bottom: 40px;
  background: var(--lightpink);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 60px;
  h1 {
    color: var(--blue);
  }
`;

const BlogCards = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  width: 30%;
  min-height: 30vh;
  margin: 10px;
  background: white;
  padding: 20px;
  img {
    width: 100%;
  }
  h6 {
    font-size: 20px;
    font-weight: 400;
  }
  p {
    font-size: 16px;
    text-align: left;
    color: var(--gray);
  }
  @media (max-width: 800px) {
    width: 100%;
    max-width: 400px;
  }
`;
