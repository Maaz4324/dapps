import { useState, useEffect } from "react";
import { ethers } from "ethers";

function renderSoldItems(items) {
  return (
    <>
      <h2>Sold</h2>
      <div>
        {items.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <div>
              <img
                variant="top"
                src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
              />
              <div>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved{" "}
                {ethers.utils.formatEther(item.price)} ETH
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
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
    <div className="flex justify-center">
      {listedItems.length > 0 ? (
        <div className="px-5 py-3 container">
          <h2>Listed</h2>
          <div>
            {listedItems.map((item, idx) => (
              <div key={idx}>
                <div>
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
                    alt=""
                  />
                  <div>{ethers.utils.formatEther(item.totalPrice)} ETH</div>
                </div>
              </div>
            ))}
          </div>
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
}
