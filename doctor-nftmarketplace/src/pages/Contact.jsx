import styled from "styled-components";
import contact from "../images/contactImg.webp";
import emailjs from "emailjs-com";
import OfficeHour from "../components/OfficeHour";
import HomeFoot from "../components/Home/HomeFoot";
import Fade from "react-reveal/Fade";

function Contact() {
  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    emailjs
      .sendForm(
        "service_74py0gf",
        "template_8dq7z4s",
        e.target,
        "crymrBWssvyArlchr"
      )
      .then(
        (result) => {
          window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert(`Message sent!`);
  }
  return (
    <ContactContainer>
      <Container>
        <Left>
          <Fade bottom>
            <H1>CONTACT US</H1>
            <img src={contact} alt="contact us" />
            <MiddleRight>
              <Para>
                Please fill out the form below, including all required fields,
                and we will contact you as soon as possible.
              </Para>
              <form onSubmit={sendEmail}>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="name"
                  placeholder="FULL NAME"
                />
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="EMAIL ADDRESS"
                  name="email"
                />
                <input type="number" name="number" placeholder="PHONE NUMBER" />
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  name="message"
                  rows="7"
                  cols="50"
                  placeholder="HOW CAN WE HELP?"
                />
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </form>
            </MiddleRight>
          </Fade>
        </Left>

        <OfficeHour />
      </Container>
      <HomeFoot />
    </ContactContainer>
  );
}

export default Contact;

const ContactContainer = styled.div`
  padding-top: 70px;
  @media (max-width: 991px) {
    padding-top: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  width: 70%;
  @media (max-width: 890px) {
    width: 100%;
    padding-right: 0px;
  }
  img {
    width: 100%;
  }
`;

const MiddleRight = styled.div`
  width: 100%;
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
  a {
    width: 35%;
    align-self: start;
  }
  button {
    width: 100%;
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
  @media (max-width: 890px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const H1 = styled.h1``;

const Para = styled.p`
  font-size: 17px;
  color: var(--gray);
`;
