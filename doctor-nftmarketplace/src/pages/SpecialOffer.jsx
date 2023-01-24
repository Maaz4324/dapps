import React from "react";
import styled from "styled-components";
import HomeFoot from "../components/Home/HomeFoot";

function SpecialOffer() {
  return (
    <SpecialOfferContainer>
      <Special>
        <SpecialTop>
          <TopContainer>
            <H1>NEW PATIENT SPECIAL OFFER</H1>
            <H4>RECEIVE A COMPLIMENTARY CONSULTATION</H4>
          </TopContainer>
          <ArrowDown></ArrowDown>
        </SpecialTop>
        <SpecialMiddle>
          <MiddleLeft>
            <Para>
              If you’d like to revitalize your health naturally and increase
              your quality of life, we encourage you to take advantage of
              <b> this valuable offer!</b> <br /> <br /> Our experienced
              chiropractors use a “whole person” approach to chiropractic care
              and wellness. This means that we work with our patients to find
              out their particular wellness needs, then craft personalized care
              plans to help them achieve the highest quality of life. We also
              offer a unique, comprehensive wellness program. Don’t just take
              our word for it though. Read our testimonials to see what our
              patients have to say. <br /> <br /> Fill out this form and start
              experiencing the difference of our chiropractic and wellness care.{" "}
              <br /> <br /> There is
              <b> NO OBLIGATION!</b> We would love to see if we can help you
              before you make a financial commitment to further treatment. Book
              now!
            </Para>
          </MiddleLeft>
          <MiddleRight>
            <Para>
              Please fill out the form below, including all required fields, and
              we will contact you as soon as possible.
            </Para>
            <form>
              <input type="text" placeholder="FULL NAME" />
              <input type="email" placeholder="EMAIL ADDRESS" />
              <input type="number" placeholder="PHONE NUMBER" />
              <textarea
                id="w3review"
                name="w3review"
                rows="7"
                cols="50"
                placeholder="HOW CAN WE HELP?"
              />
              <button>SUBMIT</button>
            </form>
          </MiddleRight>
        </SpecialMiddle>
        <SpecialBottom>
          <ArrowUp></ArrowUp>
          <BottomContainer>
            <H1>NEW PATIENT SPECIAL OFFER</H1>
            <H4>RECEIVE A COMPLIMENTARY CONSULTATION</H4>
          </BottomContainer>
        </SpecialBottom>
      </Special>
      <HomeFoot />
    </SpecialOfferContainer>
  );
}

export default SpecialOffer;

const SpecialOfferContainer = styled.div`
  min-height: 90vh;
  padding-top: 70px;
`;

const Special = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  max-width: 1047px;
`;

const SpecialTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const SpecialMiddle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  @media (max-width: 930px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SpecialBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`;

const TopContainer = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-weight: 700;
  padding: 10px;
  background-color: var(--blue);
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid var(--blue);
`;

const BottomContainer = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-weight: 700;
  padding: 10px;
  background-color: var(--blue);
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid var(--blue);
`;

const MiddleLeft = styled.div`
  width: 45%;
  @media (max-width: 930px) {
    width: 90%;
  }
`;

const MiddleRight = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    border-top: 1px solid #d0d0d0;
  }
  input {
    width: 100%;
    margin: 10px;
    padding: 6px;
    background-color: #fafafa;
    outline: none;
    border-radius: 6px;
    border: 1px solid #d0d0d0;
  }
  textarea {
    width: 100%;
    margin: 10px;
    padding: 6px;
    background-color: #fafafa;
    outline: none;
    border-radius: 6px;
    border: 1px solid #d0d0d0;
  }
  button {
    width: 35%;
    align-self: start;
    padding: 10px;
    background: var(--blue);
    border: 1px solid var(--blue);
    color: white;
    font-weight: 600;
    &:hover {
      transition: all 0.3s;
      background: var(--lightgray);
      box-shadow: 1px 2px 5px black;
      color: black;
    }
  }
  @media (max-width: 930px) {
    width: 90%;
    margin-top: 50px;
  }
`;

const H1 = styled.h1`
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const H4 = styled.h4`
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Para = styled.p`
  font-size: 17px;
`;
