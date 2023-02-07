import React, { useEffect, useState } from "react";
import styled from "styled-components";
import metamask from "../../images/metamask.svg";

function TokenItem({ id }) {
  const [item, setItem] = useState([]);
  const [walletAvailable, setWalletAvailable] = useState(false);

  async function load() {
    const uri = `https://bafybeiao7s6ljdmxcn4f7di5t23iphrq4rxcdx5lrhjevblir57ah65o3q.ipfs.nftstorage.link/${id}.json`;

    const response = await fetch(`${uri}`);
    const metadata = await response.json();
    let itemList = [
      {
        name: metadata.name,
        price: metadata.price,
        amount: metadata.amount,
        image: metadata.image.replace("ipfs://", ""),
        description: metadata.discription,
      },
    ];
    setItem(itemList);
  }

  function downloadWallet() {
    alert("Please download metamask to continue...");
  }

  useEffect(() => {
    if (window.ethereum) {
      setWalletAvailable(true);
    } else {
      setWalletAvailable(false);
    }
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <TokenItemContainer>
      {walletAvailable ? (
        <div>Wallet available</div>
      ) : (
        <div>
          {item.map((parts, idx) => (
            <Container key={idx}>
              <Left>
                <ImgContainer>
                  <img
                    src={`https://ipfs.io/ipfs/${parts.image}`}
                    alt="not available"
                  />
                </ImgContainer>
              </Left>
              <Right>
                <Head>
                  <H1>{parts.name}</H1>
                  <LightTitle style={{ marginBottom: "20px" }}>
                    {parts.amount} tokens in total
                  </LightTitle>
                  <H5 style={{ margin: "20px 0" }}>
                    {" "}
                    <LightTitle>About</LightTitle>
                    <br /> {parts.description}
                  </H5>
                </Head>
                <H1>
                  <LightTitle>Price</LightTitle>
                  <br /> {parts.price} ETH
                  <LightTitle> 4865.37 usd</LightTitle>
                </H1>
                <BuyBtn>
                  <input type="number" placeholder="Set amount" />
                  <Button onClick={downloadWallet}>Buy now</Button>
                </BuyBtn>
              </Right>
            </Container>
          ))}
        </div>
      )}
    </TokenItemContainer>
  );
}

export default TokenItem;

const TokenItemContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 30px;
  padding-top: 90px;
  @media (max-width: 1099px) {
    padding: 0;
    padding-top: 90px;
  }
  @media (max-width: 991px) {
    padding-top: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  @media (max-width: 1099px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Right = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
  @media (max-width: 1099px) {
    padding-left: 0px;
    margin: 20px 0;
  }
`;

const Left = styled.div`
  width: 50%;
  @media (max-width: 1099px) {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  @media (max-width: 1099px) {
    width: 100%;
    max-width: 549px;
    margin: 0 auto;
  }
  img {
    width: 100%;
    border-radius: 20px;
  }
`;

const Head = styled.div``;

const BuyBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  input {
    padding: 12px;
    border: 2px solid var(--lightgray);
    border-radius: 7px;
    @media (max-width: 700px) {
      width: 90%;
      max-width: 245px;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 20px;
  font-weight: bold;
  width: 40%;
  border-radius: 7px;
  margin: 10px;
  background-color: var(--blue);
  border: 1px solid var(--blue);
  color: white;
  &:hover {
    transition: all ease-in 0.3s;
    background-color: white;
    box-shadow: 1px 2px 5px black;
    color: black;
  }
  @media (max-width: 700px) {
    margin: 10px 0;
    width: 90%;
    max-width: 245px;
  }
`;

const H1 = styled.h1``;

const H5 = styled.h5``;

const LightTitle = styled.span`
  font-size: 18px;
  color: #0000009f;
`;
