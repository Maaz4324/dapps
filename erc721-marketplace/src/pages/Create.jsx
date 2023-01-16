import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        setImage(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };
  const createNFT = async (event) => {
    event.preventDefault();
    if (!image || !price || !name || !description) return;
    try {
      var data = JSON.stringify({ image, price, name, description });
      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const res = await axios(config);
      mintThenList(res);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (res) => {
    const uri = `ipfs://${res.data.IpfsHash}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };
  return (
    <div className="container-fluid mt-5">
      <form>
        <input type="file" name="file" onChange={uploadToIPFS} />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="textarea"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={createNFT}>Create NFT</button>
      </form>
    </div>
  );
};

export default Create;
