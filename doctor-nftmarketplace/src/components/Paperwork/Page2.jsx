import React, { useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

function Page2() {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  return (
    <Page2Container>
      <Container>
        <Top>
          <Span>All fields marked with * are required</Span>
        </Top>
        <Supplements>
          <H5>DO YOU TAKE ANY MEDICATIONS OR SUPPLEMENTS?</H5>
          <Inputs>
            <div>
              <label htmlFor="medications">*MEDICATIONS</label>
              <textarea name="medications" cols="30" rows="5"></textarea>
            </div>
            <div>
              <label htmlFor="supplements">*SUPPLEMENTS</label>
              <textarea name="supplements" cols="30" rows="5"></textarea>
            </div>
          </Inputs>
        </Supplements>
        <History>
          <H5>PAST HISTORY</H5>
          <Inputs>
            <Radio>
              <label htmlFor="past problem">
                *Have you suffered with any of this or a similar problem in the
                past?
              </label>
              <div>
                <input type="radio" name="pastProblem" value="yes" />
                <label htmlFor="male">yes</label>
              </div>
              <div>
                <input type="radio" name="pastProblem" value="no" />
                <label htmlFor="female">no</label>
              </div>
            </Radio>

            <Insection>
              <label htmlFor="jobs">
                *Please identify any and all types of jobs you have had in the
                past that have imposed any physical stress on you or your body:
              </label>
              <textarea name="jobs" cols="30" rows="5"></textarea>
            </Insection>

            <Insection>
              <label htmlFor="ever diagnosed">
                *Have you ever been diagnosed with any of the following
                conditions?
              </label>
              <Checkbox>
                <div>
                  <label htmlFor="arthritis">Rheumatoid Arthritis</label>
                  <input type="checkbox" name="arthritis" />
                </div>
                <div>
                  <label htmlFor="heartAttack">Heart Attack</label>
                  <input type="checkbox" name="heartAttack" />
                </div>
                <div>
                  <label htmlFor="diabetes">Diabetes</label>
                  <input type="checkbox" name="diabetes" />
                </div>
                <div>
                  <label htmlFor="other">Other serious conditions</label>
                  <input type="checkbox" name="other" />
                </div>
                <div>
                  <label htmlFor="Disability">Disability</label>
                  <input type="checkbox" name="Disability" />
                </div>
                <div>
                  <label htmlFor="Osteo-Arthritis">Osteo-Arthritis</label>
                  <input type="checkbox" name="Osteo-Arthritis" />
                </div>
                <div>
                  <label htmlFor="Stroke">Stroke</label>
                  <input type="checkbox" name="Stroke" />
                </div>
                <div>
                  <label htmlFor="Cancers">Cancers</label>
                  <input type="checkbox" name="Cancers" />
                </div>
                <div>
                  <label htmlFor="N/A">N/A</label>
                  <input type="checkbox" name="diagnosedN/A" />
                </div>
              </Checkbox>
            </Insection>

            <Insection>
              <label htmlFor="other conditions">
                *Other serious conditions (describe):
              </label>
              <input type="text" />
            </Insection>
          </Inputs>
        </History>

        <Social>
          <H5>SOCIAL HISTORY</H5>
          <Inputs>
            <Checkbox>
              <label htmlFor="smoking">*Smoking:</label>
              <div>
                <label htmlFor="cigars">Cigars</label>
                <input type="checkbox" name="cigars" />
              </div>
              <div>
                <label htmlFor="pipe">Pipe</label>
                <input type="checkbox" name="pipe" />
              </div>
              <div>
                <label htmlFor="cigarettes">Cigarettes</label>
                <input type="checkbox" name="cigarettes" />
              </div>
              <div>
                <label htmlFor="N/A">N/A</label>
                <input type="checkbox" name="somokingN/A" />
              </div>
            </Checkbox>
            <Checkbox>
              <label htmlFor="smokingOften">*How often?</label>
              <div>
                <label htmlFor="daily">Daily</label>
                <input type="checkbox" name="daily" />
              </div>
              <div>
                <label htmlFor="pipe">Weekends</label>
                <input type="checkbox" name="pipe" />
              </div>
              <div>
                <label htmlFor="Occasionally">Occasionally</label>
                <input type="checkbox" name="Occasionally" />
              </div>
              <div>
                <label htmlFor="Never">Never</label>
                <input type="checkbox" name="oftenNever" />
              </div>
            </Checkbox>
            <Checkbox>
              <label htmlFor="Alcoholic">
                *Alcoholic Beverage consumption:
              </label>
              <div>
                <label htmlFor="daily">Daily</label>
                <input type="checkbox" name="dailyAlcoholic " />
              </div>
              <div>
                <label htmlFor="pipe">Weekends</label>
                <input type="checkbox" name="pipeAlcoholic " />
              </div>
              <div>
                <label htmlFor="Occasionally">Occasionally</label>
                <input type="checkbox" name="OccasionallyAlcoholic " />
              </div>
              <div>
                <label htmlFor="Never">Never</label>
                <input type="checkbox" name="alcoholicNever" />
              </div>
            </Checkbox>
            <Checkbox>
              <label htmlFor="Alcoholic">*Recreational Drug Use:</label>
              <div>
                <label htmlFor="daily">Daily</label>
                <input type="checkbox" name="dailyAlcoholic " />
              </div>
              <div>
                <label htmlFor="pipe">Weekends</label>
                <input type="checkbox" name="pipeAlcoholic " />
              </div>
              <div>
                <label htmlFor="Occasionally">Occasionally</label>
                <input type="checkbox" name="OccasionallyAlcoholic " />
              </div>
              <div>
                <label htmlFor="Never">Never</label>
                <input type="checkbox" name="alcoholicNever" />
              </div>
            </Checkbox>

            <Insection>
              <label htmlFor="hobbies">
                *Please describe your Hobbies, Recreational Activities, &
                Exercise Regime. How does your present problem affect the
                activities listed?
              </label>
              <textarea name="hobbies" cols="30" rows="5"></textarea>
            </Insection>
            <hr />
            <Span style={{ fontSize: 14 }}>
              I hereby authorize payment to be made directly to New Leaf
              Chiropractic for all benefits which may be payable under a
              healthcare plan or from any other collateral sources. I authorize
              utilization of this application or copies thereof for the purpose
              of processing claims and effecting payments, and further
              acknowledge that this assignment of benefits does not in any way
              relieve me of payment liability and that I will remain financially
              responsible to New Leaf Chiropractic for any and all services I
              receive at this office.
            </Span>

            <Insection>
              <label htmlFor="Signature">
                *Patient or Authorized Person's Signature:
              </label>
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
              <Span>*Today's date:</Span>
              <input type="date" />
            </TodayDate>
          </Inputs>
        </Social>
      </Container>
    </Page2Container>
  );
}

export default Page2;

const Page2Container = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px;
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

const Supplements = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;

  div {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;

    textarea {
      width: 100%;
    }
  }
`;

const History = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
`;

const Social = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
`;

const Inputs = styled.div`
  width: 100%;
  border-top: 2px solid var(--blue);
  padding-top: 30px;
`;

const Radio = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: start;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: start;
  }
`;

const Checkbox = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;

  div {
    display: flex;
    align-items: center;
    margin: 5px;
    flex-direction: row-reverse;
  }

  label {
    width: 100%;
  }
  input[type="checkbox"] {
    width: 20px;
  }
`;

const Insection = styled.div`
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

const H5 = styled.h5``;

const Span = styled.span``;
