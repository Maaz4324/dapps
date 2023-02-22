import React from "react";
import styled from "styled-components";

function Category() {
  return (
    <Wrapper>
      <div className="seperator"></div>
      <h1>Browse talent by category​</h1>
    </Wrapper>
  );
}

export default Category;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right, #111118, #161727, #1a1c35);
  padding-top: 40px;
  .seperator {
    width: 100%;
    height: 5vh;
    position: absolute;
    top: 107%;
    backdrop-filter: blur(30px);
  }
`;
