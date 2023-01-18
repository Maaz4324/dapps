import React from "react";
import styled from "styled-components";
import recomemded from "../../images/recomemded.png";
import recomemdedlg from "../../images/recomemdedlg.png";

function HomeFoot() {
  return (
    <HomeFootContainer>
      <NewpatientContainer>
        <Button>New Patient Special</Button>
      </NewpatientContainer>
      <FootMain>
        <FootMainContainer>
          <Image src={recomemded} />
          <FootMainText>
            <H5>
              You may not control all the events that happen to you, but you can
              decide not to be reduced by them. If you cannot make a change,
              change the way you have been thinking. You might find a new
              solution.
            </H5>
            <H4>Maya Angelo</H4>
          </FootMainText>
        </FootMainContainer>
      </FootMain>
      <FootMap>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30594994116!2d-74.25986652425026!3d40.697149416807555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1673989716127!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          title="New York"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </FootMap>
      <FootAddr>
        <FootAddrContainer>
          <Image src={recomemdedlg} />
          <Address>
            <Para>
              <span> New Leaf Chiropractic</span> <br /> 12093 SW 152nd Street{" "}
              <br /> Miami, FL 33177 <br />
              (786) 646-0098
            </Para>
          </Address>
        </FootAddrContainer>
      </FootAddr>
      <FootCopyRigth>
        <Para className="copyrightTxt">
          COPYRIGHT © 2023 CHIROPRACTIC WEBSITES
        </Para>
      </FootCopyRigth>
    </HomeFootContainer>
  );
}

export default HomeFoot;

const HomeFootContainer = styled.div``;

const FootAddr = styled.div`
  background-color: var(--gray);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const FootAddrContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 550px;
`;

const Address = styled.div``;

const FootMap = styled.div`
  iframe {
    width: 100%;
  }
`;

const FootMain = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FootMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 897px;
`;

const FootMainText = styled.div`
  padding: 0 40px;
`;

const NewpatientContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray);
`;

const FootCopyRigth = styled.div`
  background-color: var(--blue);
  padding: 4px;
  text-align: center;
  .copyrightTxt {
    font-size: 14px;
  }
`;

const Para = styled.p`
  font-size: 18px;
  color: white;
  font-weight: 400;
  span {
    font-weight: 600;
  }
`;

const Image = styled.img`
  width: 30%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const H4 = styled.h4`
  color: var(--blue);
`;

const H5 = styled.h5`
  font-weight: 200;
  font-size: 22px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 23px;
  border: 1px solid var(--blue);
  background-color: var(--blue);
  color: white;
  border-radius: 7px;
  &:hover {
    transition: all ease 0.3s;
    background-color: white;
    color: #000000;
    box-shadow: 1px 2px 5px black;
  }
`;
