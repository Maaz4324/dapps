import { useState, useEffect } from "react";
import { ethers } from "ethers";

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
    <div className="flex justify-center">
      {purchases.length > 0 ? (
        <div className="px-5 container">
          <div xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                <div>
                  <img
                    variant="top"
                    src={`https://gateway.pinata.cloud/ipfs/${item.image}`}
                  />
                  <div>{ethers.utils.formatEther(item.totalPrice)} ETH</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No purchases</h2>
        </main>
      )}
    </div>
  );
}
