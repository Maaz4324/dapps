import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplace.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        const hash = uri.replace("ipfs://", "");
        // use uri to fetch the nft metadata stored on ipfs

        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${hash}`
        );
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace("ipfs://", ""),
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };

  useEffect(() => {
    loadPurchasedItems();
  }, []);

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );

  return (
    <Purchases>
      {purchases.length > 0 ? (
        <PurchasesContainer>
          <H1>Tokens you bought</H1>
          <H5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus at cumque dignissimos quae perspiciatis doloribus,
            dolorum, omnis nobis, corrupti adipisci quidem vitae voluptate
            autem. Reprehenderit perspiciatis quos alias aspernatur ut.
          </H5>
          {purchases.map((item, idx) => (
            <PurchasesBox key={idx}>
              <PurchasesImgCont>
                <img
                  variant="top"
                  src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
                  alt=""
                />
              </PurchasesImgCont>
              <ItemBoxText>
                <H6>{item.name}</H6>
                <Descrip>{item.description}</Descrip>
                <Descrip>
                  {ethers.utils.formatEther(item.totalPrice)} ETH
                </Descrip>
              </ItemBoxText>
            </PurchasesBox>
          ))}
        </PurchasesContainer>
      ) : (
        <NoPurchases style={{ padding: "1rem 0" }}>
          <h1>No purchases</h1>
          <H5>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
            maxime sit. Perspiciatis necessitatibus delectus quod. Saepe
            doloremque iste excepturi provident eum quibusdam minima, facere
            deserunt odit placeat commodi quos et.
          </H5>
        </NoPurchases>
      )}
    </Purchases>
  );
}

const Purchases = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-image: linear-gradient(
    to top,
    #96c3ea,
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 0)
  );
`;

const PurchasesContainer = styled.div`
  width: 100%;
  max-width: 1047px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1050px) {
    align-items: center;
  }
`;

const PurchasesBox = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 20px;
  margin: 20px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: start;
  background: #f3f3f3;
  box-shadow: 1px 2px 6px black;
  @media (max-width: 1100px) {
    width: 200px;
    height: 300px;
    margin: 10px;
  }
  &:hover {
    transition: 0.3s;
    box-shadow: 2px 3px 6px black;
  }
`;

const H1 = styled.h1``;

const H5 = styled.h5``;

const ItemBoxText = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 6px;
`;

const NoPurchases = styled.div`
  width: 100%;
  max-width: 1047px;
  min-height: 50vh;
`;

const PurchasesImgCont = styled.div`
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  img {
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const H6 = styled.h6`
  font-weight: 700;
  font-size: 20px;
`;

const Descrip = styled.p`
  line-height: 100%;
  word-break: break-all;
`;
