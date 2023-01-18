import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";

const AllItems = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        const hash = uri.replace("ipfs://", "");

        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${hash}`
        );
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace("ipfs://", ""),
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  if (loading)
    return (
      <LoadingContainer style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </LoadingContainer>
    );
  return (
    <AllItemsContainer>
      {items.length > 0 ? (
        <ItemContainer>
          <H1>Explore and Buy NFTs</H1>
          <NftContainer>
            {items.map((item, idx) => (
              <NftBox key={idx}>
                <NftImgContainer
                  style={{
                    backgroundImage: `url(${
                      "https://gateway.pinata.cloud/ipfs/" + item.image
                    })`,
                  }}
                ></NftImgContainer>
                <NftText>
                  <H4>{item.name}</H4>
                  <Descrip>{item.description}</Descrip>
                </NftText>
                <BuyButton onClick={() => buyMarketItem(item)}>
                  Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                </BuyButton>
              </NftBox>
            ))}
          </NftContainer>
        </ItemContainer>
      ) : (
        <NoItemContainer style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </NoItemContainer>
      )}
    </AllItemsContainer>
  );
};
export default AllItems;

const LoadingContainer = styled.div`
  text-align: center;
`;

const AllItemsContainer = styled.div`
  text-align: center;
  padding-top: 70px;
`;

const NoItemContainer = styled.div`
  text-align: center;
`;

const ItemContainer = styled.div`
  text-align: center;
`;

const NftContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const NftBox = styled.div`
  width: 250px;
  height: 350px;
  border-radius: 20px;
  margin: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
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
    box-shadow: 2px 3px 10px black;
  }
`;

const NftText = styled.div``;

const NftImgContainer = styled.div`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const H1 = styled.h1``;
const H4 = styled.h4`
  font-weight: 800;
`;
const Descrip = styled.p`
  line-height: 100%;
`;

const BuyButton = styled.button`
  padding: 4px 10px;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: var(--blue);
  color: white;
  font-weight: 600;
  border: 0;
  &:hover {
    transition: 0.3s;
    background-color: var(--lightblue);
  }
`;
