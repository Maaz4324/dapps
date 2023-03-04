import React from "react";
import Chatbox from "../component/chat/Chatbox";
import Sidebar from "../component/chat/Sidebar";
import styled from "styled-components";

function Chat({ chatSellerId }) {
  return (
    <Wrapper>
      <Container>
        <Sidebar />
        <Chatbox />
      </Container>
    </Wrapper>
  );
}

export default Chat;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: rgb(255, 255, 255);
  padding-top: 100px;
  border: 2px solid red;
  background: var(--black);
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  border: 2px solid white;
  background: var(--darkBg);
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  height: 80vh;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: 80px;
  padding: 20px;
`;
