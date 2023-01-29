import React, { useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

function Page3() {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  return (
    <Page3Container>
      <Container>
        <H5>NOTICE OF PRIVACY PRACTICE</H5>
        <Top>
          <Span style={{ fontWeight: 800, marginBottom: "10px" }}>
            All fields marked with * are required
          </Span>
          <p>
            This office is required to notify you in writing, that by law, we
            must maintain the privacy and confidentiality of your Personal
            Health Information. We must provide you with written notice
            concerning your rights to gain access to your health information,
            and the potential circumstances under which, by law, or as dictated
            by our office policy, we are permitted to disclose information about
            you to a third party without your authorization. Below is a brief
            summary of these circumstances. If you would like a more detailed
            explanation, one will be provided to you. In addition, you will find
            we have placed several copies in report folders labeled `HIPAA' on
            tables in the reception. Once you have read this notice, please sign
            the last page, and return only the signature page (page 2) to our
            front desk receptionist. Keep this page for your records.
          </p>
        </Top>
        <Permitted>
          <h6>PERMITTED DISCLOSURES:</h6>
          <ol>
            <li>
              Treatment purposes- discussion with other health care providers
              involved in your care
            </li>
            <li>
              Inadvertent disclosures- open treating area mean open discussion.
              If you need to speak privately to the doctor, please let our staff
              know so we can place you in a private consultation room.
            </li>
            <li>
              For payment purposes - to obtain payment from your insurance
              company or any other collateral source.
            </li>
            <li>
              For workers compensation purposes- to process a claim or aid in
              investigation
            </li>
            <li>
              Emergency- in the event of a medical emergency we may notify a
              family member
            </li>
            <li>
              For Public health and safety - in order to prevent or lessen a
              serious or eminent threat to the health or safety of a person or
              general public.
            </li>
            <li>
              To Government agencies or Law enforcement - to identify or locate
              a suspect, fugitive, material witness or missing person.
            </li>
            <li>
              For military, national security, prisoner and government benefits
              purposes.
            </li>
            <li>
              Deceased persons -discussion with coroners and medical examiners
              in the event of a patient's death.
            </li>
            <li>
              Telephone calls or emails and appointment reminders -we may call
              your home and leave messages regarding a missed appointment or
              apprize you of changes in practice hours or up coming events.
            </li>
            <li>
              Change of ownership- in the event this practice is sold, the new
              owners would have access to your PHI.
            </li>
          </ol>
        </Permitted>
        <Rights>
          <h6>YOUR RIGHTS:</h6>
          <ol>
            <li>To receive an accounting of disclosures</li>
            <li>
              To receive a paper copy of the comprehensive "Detail" Privacy
              Notice
            </li>
            <li>To request mailings to an address different than residence</li>
            <li>
              To request Restrictions on certain uses and disclosures and with
              whom we release information to, although we are not required to
              comply. If, however, we agree, the restriction will be in place
              until written notice of your intent to remove the restriction.
            </li>
            <li>
              To inspect your records and receive one copy of your records at no
              charge, with notice in advance
            </li>
            <li>
              To request amendments to information. However, like restrictions,
              we are not required to agree to them.
            </li>
            <li>
              To obtain one copy of your records at no charge, when timely
              notice is provided (72 hours). X-rays are original records and you
              are therefore not entitled to them. If you would like us to
              outsource them to an imaging center, to have copies made, we will
              be happy to accommodate you. However, you will be responsible for
              this cost.
            </li>
          </ol>
        </Rights>
        <Extra>
          <p>
            I have received a copy of New Leaf Chiropractic's Patient Privacy
            Notice. I understand my rights as well as the practices duty to
            protect my health information, and have conveyed my understanding of
            these rights and duties to the doctor. I further understand that
            this office reserves the right to amend this `Notice of Privacy
            Practice" at an time in the future and will make the new provisions
            effective for all information that it maintains past and present.
            <br />
            <br />I am aware that a more comprehensive version of this "Notice"
            is available to me and several copies kept in the reception area. At
            this time, I do not have any questions regarding my rights or any of
            the information I have received.
          </p>
        </Extra>
        <Insection>
          <label htmlFor="name">*Patient's Name</label>
          <input type="text" />
        </Insection>

        <TodayDate>
          <Span>*DOB:</Span>
          <input type="date" />
        </TodayDate>

        <Insection>
          <label htmlFor="Signature">*Signature:</label>
          <Span>
            Please sign in the box below using your mouse, touch screen, or
            touchpad.
          </Span>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="green"
            style={{ background: "gray" }}
            canvasProps={{
              width: 600,
              height: 200,
              className: "sigCanvas",
            }}
          />
          <button onClick={clear}>Clear</button>
          <Span>
            I accept that this is the legal representation of my signature.
          </Span>
        </Insection>

        <TodayDate>
          <Span>*Date:</Span>
          <input type="date" />
        </TodayDate>
      </Container>
    </Page3Container>
  );
}

export default Page3;

const Page3Container = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px;

  p,
  li {
    font-size: 14px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
  border-top: 2px solid var(--blue);
`;

const Insection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  input {
    width: 100%;
    padding: 7px;
  }
  textarea {
    width: 100%;
    padding: 7px;
  }
  select {
    padding: 7px;
    width: 100%;
  }
  .sigCanvas {
    border: 2px dashed black;
    background: var(--lightgray);
    margin: 7px 0;
    @media (max-width: 683px) {
      width: 100%;
    }
  }
  button {
    padding: 3px 7px;
  }
`;

const TodayDate = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  input {
    width: 100%;
    padding: 7px;
  }
`;

const Permitted = styled.div``;

const Rights = styled.div``;

const Extra = styled.div``;

const H5 = styled.h5``;

const Span = styled.span``;
