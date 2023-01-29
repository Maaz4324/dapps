import React from "react";
import styled from "styled-components";

function FormHead() {
  return (
    <FormHeadContainer>
      <Container>
        <h1>NEW PATIENT INTAKE FORM</h1>
        <Line></Line>
      </Container>
    </FormHeadContainer>
  );
}

export default FormHead;

const FormHeadContainer = styled.div`
  padding-top: 90px;
  text-align: center;
  @media (max-width: 990px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  h1 {
    font-weight: bold;
    color: var(--headgray);
  }
`;

const Line = styled.div`
  border-bottom: 7px solid var(--blue);
  box-shadow: 2px 3px 4px gray;
`;
