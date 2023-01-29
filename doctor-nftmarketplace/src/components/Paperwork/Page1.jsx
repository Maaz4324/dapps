import React from "react";
import styled from "styled-components";

function Page1() {
  return (
    <Page1Container>
      <Container>
        <Top>
          <Span>All fields marked with * are required</Span>
          <TodayDate>
            <Span>*Today's date:</Span>
            <input type="date" />
          </TodayDate>
        </Top>
        <Demographics>
          <h5>PATIENT DEMOGRAPHICS</h5>
          <Inputs>
            <Insection>
              <label htmlFor="name">*Name:</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="bdate">*Birth date:</label>
              <input type="date" />
            </Insection>

            <Insection>
              <label htmlFor="age">*Age:</label>
              <input type="number" />
            </Insection>
            <Insection>
              <label htmlFor="sex">*Sex</label>
              <Sex>
                <div>
                  <input type="radio" name="sex" value="male" />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input type="radio" name="sex" value="female" />
                  <label htmlFor="female">Female</label>
                </div>
              </Sex>
            </Insection>
            <Insection>
              <label htmlFor="address">*Address</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="city">*City</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="state">*State</label>
              <select name="states">
                <option value="">Choose...</option>
                <option value="AK">AK</option>
                <option value="AL">AL</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GH">GH</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
              </select>
            </Insection>
            <Insection>
              <label htmlFor="zip">*Zip</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="email">*E-mail Address:</label>
              <input type="email" />
            </Insection>
            <Insection>
              <label htmlFor="phone">*Cell Phone</label>
              <input type="number" />
            </Insection>
            <Insection>
              <label htmlFor="security">Social Security #:</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="emergency contact">
                *Name & Number of Emergency Contact:
              </label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="relationship">*Relationship:</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="profession">*Profession:</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="employer">*Employer:</label>
              <input type="text" />
            </Insection>
            <Insection>
              <label htmlFor="marital status">*Marital Status:</label>
              <input type="text" />
            </Insection>
          </Inputs>
        </Demographics>
        <Complaint>
          <h5>HISTORY OF COMPLAINT</h5>
          <Inputs>
            <Span>
              Please identify the condition(s) that brought you to this office:
            </Span>
            <Insection>
              <label htmlFor="condition1">*Condition1:</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="severity">*Severity:</label>
              <select name="severityNum">
                <option value="">Choose one...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="problem period">*How Long Had Problem?</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="injury related">*Injury Related?</label>
              <select name="injury related bool">
                <option value="">Choose one...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="constant pain">*Is Pain Constant?</label>
              <select name="constant pain bool">
                <option value="">Choose one...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="treated in past">
                *Condition(s) ever treated by anyone in the past?
              </label>
              <PastTreat>
                <div>
                  <input type="radio" name="treat?" value="yesTreated" />
                  <label htmlFor="forYes">Yes</label>
                </div>
                <div>
                  <input type="radio" name="treat?" value="noTreated" />
                  <label htmlFor="forNo">No</label>
                </div>
              </PastTreat>
            </Insection>

            <Insection>
              <label htmlFor="whenWhom">*If yes, When & By Whom</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="name of prev doc">
                *Name of Previous Chiropractor:
              </label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="relieves">*What relieves your symptoms?</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="feel worse">*What makes them feel worse?</label>
              <input type="text" />
            </Insection>

            <Insection>
              <label htmlFor="accident?">
                *Is your problem the result of ANY type of accident?
              </label>
              <PastTreat>
                <div>
                  <input type="radio" name="accident" value="yes" />
                  <label htmlFor="forYes">Yes</label>
                </div>
                <div>
                  <input type="radio" name="accident" value="no" />
                  <label htmlFor="forNo">No</label>
                </div>
              </PastTreat>
            </Insection>

            <Insection>
              <label htmlFor="injuries?">
                *Have you had ANY other injury(ies) to your spine, minor or
                major:
              </label>
              <textarea name="injuries" cols="30" rows="5"></textarea>
            </Insection>
          </Inputs>
          <ComplaintMid>
            <Span>
              How is your current condition affecting your ability to carry out
              your daily activities?
            </Span>

            <Insection>
              <label htmlFor="sit2stand">*Go from Sit to Stand</label>
              <RadioInput>
                <input type="radio" name="Sit2Stand" value="no effect" />
                <label htmlFor="no effect">No effect</label>
                <input type="radio" name="Sit2Stand" value="can do" />
                <label htmlFor="can do">Painfull (can do)</label>
                <input type="radio" name="Sit2Stand" value="limit" />
                <label htmlFor="limit">Painful (limits)</label>
                <input type="radio" name="Sit2Stand" value="Unable" />
                <label htmlFor="Unable">Unable to Perform</label>
              </RadioInput>
            </Insection>

            <Insection>
              <label htmlFor="Sitting">
                *Sitting/Standing more than 15 minutes
              </label>
              <RadioInput>
                <input type="radio" name="Sitting" value="no effect" />
                <label htmlFor="no effect">No effect</label>
                <input type="radio" name="Sitting" value="can do" />
                <label htmlFor="can do">Painfull (can do)</label>
                <input type="radio" name="Sitting" value="limit" />
                <label htmlFor="limit">Painful (limits)</label>
                <input type="radio" name="Sitting" value="Unable" />
                <label htmlFor="Unable">Unable to Perform</label>
              </RadioInput>
            </Insection>

            <Insection>
              <label htmlFor="walking">*Walking</label>
              <RadioInput>
                <input type="radio" name="walking" value="no effect" />
                <label htmlFor="no effect">No effect</label>
                <input type="radio" name="walking" value="can do" />
                <label htmlFor="can do">Painfull (can do)</label>
                <input type="radio" name="walking" value="limit" />
                <label htmlFor="limit">Painful (limits)</label>
                <input type="radio" name="walking" value="Unable" />
                <label htmlFor="Unable">Unable to Perform</label>
              </RadioInput>
            </Insection>

            <Insection>
              <label htmlFor="energy">*Energy Level</label>
              <RadioInput>
                <input type="radio" name="energy" value="no effect" />
                <label htmlFor="no effect">No effect</label>
                <input type="radio" name="energy" value="can do" />
                <label htmlFor="can do">Painfull (can do)</label>
                <input type="radio" name="energy" value="limit" />
                <label htmlFor="limit">Painful (limits)</label>
                <input type="radio" name="energy" value="Unable" />
                <label htmlFor="Unable">Unable to Perform</label>
              </RadioInput>
            </Insection>

            <Insection>
              <label htmlFor="other">Other</label>
              <RadioInput>
                <input type="radio" name="other" value="no effect" />
                <label htmlFor="no effect">No effect</label>
                <input type="radio" name="other" value="can do" />
                <label htmlFor="can do">Painfull (can do)</label>
                <input type="radio" name="other" value="limit" />
                <label htmlFor="limit">Painful (limits)</label>
                <input type="radio" name="other" value="Unable" />
                <label htmlFor="Unable">Unable to Perform</label>
              </RadioInput>
            </Insection>

            <Insection>
              <label htmlFor="other pain">Other (describe):</label>
              <input type="text" />
            </Insection>
          </ComplaintMid>

          <ComplainBottom>
            <Span>
              Please mark <b>P</b> for in the <b>Past</b>, <b>C</b> for{" "}
              <b>Currently</b> have and <b>N</b> for <b>Never</b>
            </Span>

            <Insection>
              <label htmlFor="Headache">*Headache/Neck</label>
              <select name="Headache">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Jaw Pain, TMJ">*Jaw Pain, TMJ</label>
              <select name="Jaw Pain, TMJ">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Scoliosis">*Scoliosis</label>
              <select name="Scoliosis">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="ADD/ADHD">*ADD/ADHD</label>
              <select name="ADD/ADHD">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Numb/Tingling in arms/legs">
                *Numb/Tingling in arms/legs
              </label>
              <select name="Numb/Tingling in arms/legs">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Foot/Knee">*Foot/Knee</label>
              <select name="Foot/Knee">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Sleeping Issues">*Sleeping Issues</label>
              <select name="Sleeping Issues">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Back/hip Pain">*Back/hip Pain</label>
              <select name="Back/hip Pain">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>

            <Insection>
              <label htmlFor="Arthritis">*Arthritis</label>
              <select name="Arthritis">
                <option value="">Choose one...</option>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="N">N</option>
              </select>
            </Insection>
          </ComplainBottom>
        </Complaint>
      </Container>
    </Page1Container>
  );
}

export default Page1;

const Page1Container = styled.div``;

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

const Inputs = styled.div`
  width: 100%;
  border-top: 2px solid var(--blue);
`;

const ComplaintMid = styled.div`
  width: 100%;
  border-top: 1px solid var(--gray);
  padding: 30px 0;
`;

const ComplainBottom = styled.div`
  width: 100%;
  border-top: 1px solid var(--gray);
  padding: 30px 0;
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
`;

const Demographics = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;

  h5 {
    font-weight: bold;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Complaint = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;

  h5 {
    font-weight: bold;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Sex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
  input {
    margin: 2px;
  }
`;

const PastTreat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
  input {
    margin: 2px;
  }
`;

const RadioInput = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span``;
