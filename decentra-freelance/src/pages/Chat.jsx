import React, { useState, useEffect } from "react";
import Chatbox from "../component/chat/Chatbox";
import Sidebar from "../component/chat/Sidebar";
import styled from "styled-components";

function Chat() {
  const [changeSellerId, setChangeSellerId] = useState("");
  return (
    <Wrapper>
      <Container>
        <Sidebar idChange={setChangeSellerId} />
        <Chatbox sellerChangeState={changeSellerId} />
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
  background: var(--black);
  @media (max-width: 930px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  background: var(--darkBg);
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  min-height: 80vh;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: 80px;
  padding: 20px;
`;
