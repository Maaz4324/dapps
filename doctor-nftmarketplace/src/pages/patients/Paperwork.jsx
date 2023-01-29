import React from "react";
import styled from "styled-components";
import FormHead from "../../components/Paperwork/FormHead";
import Page1 from "../../components/Paperwork/Page1";

function Paperwork() {
  return (
    <PaperworkContainer>
      <Container>
        <FormHead />
        <Page1 />
        <BtnsContainer>
          <Button>Previous page</Button>
          <Button>Next page</Button>
        </BtnsContainer>
      </Container>
    </PaperworkContainer>
  );
}

export default Paperwork;

const PaperworkContainer = styled.div`
  min-height: 100vh;
  background-color: #e6e6e6;
  padding: 40px 0;
  padding-bottom: 80px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 10px;
  min-height: 100vh;
  background-color: white;
`;

const BtnsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  @media (max-width: 400px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Button = styled.button`
  padding: 7px 25px;
  font-weight: bold;
  color: white;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  &:hover {
    transition: all ease-in 0.3s;
    background-color: white;
    box-shadow: 1px 2px 5px black;
    color: black;
  }

  @media (max-width: 400px) {
    margin: 10px;
  }
`;
