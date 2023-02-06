import React, { useState } from "react";
import styled from "styled-components";
import plus from "../images/plus.png";
import minus from "../images/minus.png";

const MeetAccor = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <Accordion className="accordion">
        <AccordionItem className="accordion-item">
          <AccordionTitle
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <h5>{title}</h5>
            <PMSign>
              {isActive ? (
                <img src={minus} alt="" />
              ) : (
                <img src={plus} alt="" />
              )}
            </PMSign>
          </AccordionTitle>
          {isActive && (
            <Content className="accordion-content">
              <p>{content}</p>
            </Content>
          )}
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
};

export default MeetAccor;

const Accordion = styled.div`
  margin: 5px 0;
`;

const AccordionItem = styled.div`
  border: 0;
`;

const PMSign = styled.div`
  padding: 4px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #f6f6f6;
  padding: 2px 20px;
  h5 {
    font-size: 20px;
    font-weight: 700;
    color: var(--headgray);
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 10px;
  p {
    color: var(--gray);
  }
`;
