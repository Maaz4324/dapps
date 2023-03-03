import React from "react";
import styled from "styled-components";
import chat from "../../images/chat.svg";

function Sidebar() {
  return (
    <Wrapper>
      <User>
        <Profile>
          <Img>
            <img src={chat} alt="" />
          </Img>
          <div>
            <h4>User Name</h4>
            <p>
              Previous chat fjdslj ljsdflsdkfj lasdjfosadfjsoagffg oihgdj
              soafifj heihl omaa az hai ow are ou
            </p>
          </div>
        </Profile>
      </User>
      <User>
        <Profile>
          <Img>
            <img src={chat} alt="" />
          </Img>
          <div>
            <h4>User Name</h4>
            <p>
              Previous chat fjdslj ljsdflsdkfj lasdjfosadfjsoagffg oihgdj
              soafifj heihl omaa az hai ow are ou
            </p>
          </div>
        </Profile>
      </User>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  padding: 5px;
`;

const Profile = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 20% 60%;
  div {
  }
  img {
    width: 100%;
  }
  h4 {
    padding: 0;
    padding-top: 6px;
  }
  p {
    color: var(--darkText);
    font-size: 13px;
    font-weight: 100;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const User = styled.div`
  border-bottom: 1px solid var(--gray);
  /* padding: 7px; */
  /* border-radius: 10px; */
  margin: 10px 0;
  cursor: pointer;
`;

const Img = styled.div`
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/3;
`;