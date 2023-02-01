import React, { useState, useEffect } from "react";
import styled from "styled-components";

function NoAdmin({ setIsAdmin }) {
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [walletAvailable, setWalletAvailable] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setWalletAvailable(true);
    } else {
      setWalletAvailable(false);
      alert("You dont have metamask wallet");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      address === "your_address" &&
      password === "your_password" &&
      walletAvailable
    ) {
      setIsAdmin(true);
    } else {
      alert(
        "Wrong password or wallet address or you don't have metamask wallet"
      );
    }
  }

  return (
    <NoAdminContainer>
      <h5>
        Please enter your wallet address. Only contract owner can enter the
        portal.
      </h5>
      <Container>
        <form>
          <input
            type="text"
            placeholder="Wallet address"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={address}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </Container>
    </NoAdminContainer>
  );
}

export default NoAdmin;

const NoAdminContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h5 {
    width: 40%;
    text-align: center;
  }
`;

const Container = styled.div`
  width: 30%;
  border: 2px solid black;
  padding: 40px 10px;
  background: #2b2b2b;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
      width: 90%;
      margin: 5px 0;
      padding: 8px;
    }
    button {
      width: 90%;
      margin: 5px 0;
      padding: 8px;
      border: 0;
    }
  }
`;
