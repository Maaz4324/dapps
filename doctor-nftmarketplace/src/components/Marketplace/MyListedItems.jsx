import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";

function renderSoldItems(items) {
  return (
    <SoldItemsContainer>
      <H2>Items sold</H2>
      <MyItems>
        {items.map((item, idx) => (
          <MyItemsBox key={idx} className="overflow-hidden">
            <MyItemImg>
              <img
                variant="top"
                src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
              />
            </MyItemImg>
            <ItemBoxText>
              <H6>{item.name}</H6>
              <Descrip>{item.description}</Descrip>
              <Descrip>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved{" "}
                {ethers.utils.formatEther(item.price)} ETH
              </Descrip>
            </ItemBoxText>
          </MyItemsBox>
        ))}
      </MyItems>
    </SoldItemsContainer>
  );
}

export default function MyListedItems({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        const hash = uri.replace("ipfs://", "");

        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${hash}`
        );
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace("ipfs://", ""),
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };

  useEffect(() => {
    loadListedItems();
  }, []);

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <ListedContainer>
      <ListedNft>
        {listedItems.length > 0 ? (
          <ListedItems>
            <H1>Your Collection</H1>
            <H5>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
              maxime sit. Perspiciatis necessitatibus delectus quod. Saepe
              doloremque iste excepturi provident eum quibusdam minima, facere
              deserunt odit placeat commodi quos et.
            </H5>
            <MyItems>
              {listedItems.map((item, idx) => (
                <MyItemsBox key={idx}>
                  <MyItemImg>
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
                      alt=""
                    />
                  </MyItemImg>
                  <ItemBoxText>
                    <H6>{item.name}</H6>
                    <Descrip>{item.description}</Descrip>
                    <Descrip>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                    </Descrip>
                  </ItemBoxText>
                </MyItemsBox>
              ))}
            </MyItems>
            {soldItems.length > 0 && renderSoldItems(soldItems)}
          </ListedItems>
        ) : (
          <NoItem style={{ padding: "1rem 0" }}>
            <h1>No listed assets</h1>
            <H5>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
              maxime sit. Perspiciatis necessitatibus delectus quod. Saepe
              doloremque iste excepturi provident eum quibusdam minima, facere
              deserunt odit placeat commodi quos et.
            </H5>
          </NoItem>
        )}
      </ListedNft>
    </ListedContainer>
  );
}

const ListedContainer = styled.div``;

const ListedNft = styled.div`
  /* text-align: center; */
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
`;

const ListedItems = styled.div``;

const SoldItemsContainer = styled.div``;

const ItemBoxText = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 6px;
`;

const MyItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
`;

const MyItemsBox = styled.div`
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

const MyItemImg = styled.div`
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  img {
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const NoItem = styled.div`
  width: 100%;
  max-width: 1047px;
  min-height: 50vh;
`;

const H1 = styled.h1``;

const H5 = styled.h5``;

const H2 = styled.h2`
  font-size: 30px;
`;

const H6 = styled.h6`
  font-weight: 700;
  font-size: 20px;
`;

const Descrip = styled.p`
  line-height: 100%;
  word-break: break-all;
`;
