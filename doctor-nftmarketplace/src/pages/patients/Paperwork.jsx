import React, { useState } from "react";
import styled from "styled-components";
import HomeMain from "../../components/Home/HomeMain";
import FormHead from "../../components/Paperwork/FormHead";
import Page1 from "../../components/Paperwork/Page1";
import Page2 from "../../components/Paperwork/Page2";
import Meet from "../about/Meet";
import Tour from "../about/Tour";

function Paperwork() {
  const [page, setPage] = useState(1);

  function nextPage() {
    if (page > 0 && page < 5) {
      setPage(page + 1);
    }
    console.log(page);
  }

  function prevPage() {
    if (page > 1 && page <= 5) {
      setPage(page - 1);
      console.log(page);
    }
    console.log(page);
  }

  return (
    <PaperworkContainer>
      <Container>
        <FormHead />
        {page === 1 && <Page1 />}
        {page === 2 && <Page2 />}
        {page === 3 && <HomeMain />}
        {page === 4 && <Meet />}
        {page === 5 && <Tour />}
        <BtnsContainer>
          <Button onClick={prevPage}>Previous page</Button>
          <Button onClick={nextPage}>Next page</Button>
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
