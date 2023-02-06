import React, { useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

function Page5() {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();
  return (
    <Page5Container>
      <Container>
        <H5>INFORMED CONSENT TO CARE</H5>
        <Top>
          <Span style={{ fontWeight: 800, marginBottom: "10px" }}>
            All fields marked with * are required
          </Span>
          <p>
            You are the decision maker for your health care. Part of our role is
            to provide you with information to assist you in making informed
            choices. This process is often referred to as "informed consent" and
            involves your understanding and agreement regarding the care we
            recommend, the benefits and risks associated with the care,
            alternatives, and the potential effect on your health if you choose
            not to receive the care.
            <br />
            <br />
            We may conduct some diagnostic or examination procedures if
            indicated. Any examinations or tests conducted will be carefully
            performed but may be uncomfortable.
            <br />
            <br />
            Chiropractic care centrally involves what is known as a chiropractic
            adjustment. There may be additional supportive procedures or
            recommendations as well. When providing an adjustment, we use our
            hands or an instrument to reposition anatomical structures, such as
            vertebrae. Potential benefits of an adjustment include restoring
            normal joint motion, reducing swelling and inflammation in a joint,
            reducing pain in the joint, and improving neurological functioning
            and overall well-being.
            <br />
            <br />
            It is important that you understand, as with all health care
            approaches, results are not guaranteed, and there is no promise to
            cure. As with all types of health care interventions, there are some
            risks to care, including, but not limited to: muscle spasms,
            aggravating and/or temporary increase in symptoms, lack of
            improvement of symptoms, burns and/or scarring from electrical
            stimulation and from hot or cold therapies, including but not
            limited to hot packs and ice, fractures (broken bones), disc
            injuries, strokes, dislocations, strains, and sprains. With respect
            to strokes, there is a rare but serious condition known as an
            "arterial dissection" that typically is caused by a tear in the
            inner layer of the artery that may cause the development of a
            thrombus (clot) with the potential to lead to a stroke. The best
            available scientific evidence supports the understanding that
            chiropractic adjustment does not cause a dissection in a normal,
            healthy artery. Disease processes, genetic disorders, medications,
            and vessel abnormalities may cause an artery to be more susceptible
            to dissection. Strokes caused by arterial dissections have been
            associated with over 72 everyday activities such as sneezing,
            driving, and playing tennis.
            <br />
            <br />
            Arterial dissections occur in 3-4 of every 100,000 people whether
            they are receiving health care or not. Patients who experience this
            condition often, but not always, present to their medical doctor or
            chiropractor with neck pain and headache. Unfortunately a percentage
            of these patients will experience a stroke.
            <br />
            <br />
            The reported association between chiropractic visits and stroke is
            exceedingly rare and is estimated to be related in one in one
            million to one in two million cervical adjustments. For comparison,
            the incidence of hospital admission attributed to aspirin use from
            major GI events of the entire (upper and lower) GI tract was 1219
            events/ per one million persons/year and risk of death has been
            estimated as 104 per one million users.
            <br />
            <br />
            It is also important that you understand there are treatment options
            available for your condition other than chiropractic procedures.
            Likely, you have tried many of these approaches already. These
            options may include, but are not limited to: self-administered care,
            over-the-counter pain relievers, physical measures and rest, medical
            care with prescription drugs, physical therapy, bracing, injections,
            and surgery. Lastly, you have the right to a second opinion and to
            secure other opinions about your circumstances and health care as
            you see fit.
            <br />
            <br />I have read, or have had read to me, the above consent. I
            appreciate that it is not possible to consider every possible
            complication to care. I have also had an opportunity to ask
            questions about its content, and by signing below, I agree with the
            current or future recommendation to receive chiropractic care as is
            deemed appropriate for my circumstance. I intend this consent to
            cover the entire course of care from all providers in this office
            for my present condition and for any future condition(s) for which I
            seek chiropractic care from this office.
          </p>
        </Top>

        <Insection>
          <label htmlFor="name">*Patient Name:</label>
          <input type="text" />
        </Insection>

        <Insection>
          <label htmlFor="Representative">*Signature:</label>
          <p>
            Please sign in the box below using your mouse, touch screen, or
            touchpad.
          </p>
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
          <p>I accept that this is the legal representation of my signature.</p>
        </Insection>

        <TodayDate>
          <Span>*Date:</Span>
          <input type="date" />
        </TodayDate>

        <Insection>
          <label htmlFor="name">*Parent or Guardian Name:</label>
          <input type="text" />
        </Insection>

        <Insection>
          <label htmlFor="Representative">Signature:</label>
          <p>
            Please sign in the box below using your mouse, touch screen, or
            touchpad.
          </p>
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
          <p>I accept that this is the legal representation of my signature.</p>
        </Insection>

        <TodayDate>
          <Span>Date:</Span>
          <input type="date" />
        </TodayDate>
      </Container>
    </Page5Container>
  );
}

export default Page5;

const Page5Container = styled.div``;

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

const Span = styled.span``;

const H5 = styled.h5``;
