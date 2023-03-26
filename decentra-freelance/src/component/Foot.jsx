import React from "react";
import styled from "styled-components";

function Foot() {
  return (
    <Wrapper>
      <Container>
        <div>
          <p>
            <span>
              © SkillSwap: 2023 The Nightwalkers DAO. All rights reserved.{" "}
              <a href="/toc">TOC</a>
            </span>
          </p>
        </div>
        <div>
          <a
            href="https://discord.com/channels/971401802916458586/"
            target="_blank"
          >
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z"></path>{" "}
              </g>
            </svg>
          </a>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Foot;

const Wrapper = styled.section`
  background: var(--black);
`;

const Container = styled.section`
  padding: 10px 0;
  border-top: 1px solid var(--gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1147px;
  margin: 0 auto;
  svg {
    width: 32px;
    cursor: pointer;
    fill: white;
    &:hover {
      fill: #5865f2;
    }
    @media (max-width: 730px) {
      width: 28px;
    }
  }
  a {
    color: var(--link);
  }
  span {
    font-size: 14px;
    @media (max-width: 730px) {
      font-size: 12px;
    }
  }
  @media (max-width: 445px) {
    justify-content: center;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;
