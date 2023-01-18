import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import styled from "styled-components";

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayImg, setDisplayImg] = useState();

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
        setDisplayImg(resFile.data.IpfsHash);
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
    <CreateContainer>
      <CreateNft>
        <CreateHeadContainer>
          <H1>Create your own NFT</H1>
          <H5>
            Create a new ERC721 token collection, upload your digital creation
            and sell them as tokens to your fans - all for free. <br /> You can
            also manage smart contracts that you created
          </H5>
        </CreateHeadContainer>
        <CreateForm>
          <CreateImgContainer>
            <CreateImg
              src={`https://gateway.pinata.cloud/ipfs/${displayImg}`}
              alt=""
            />
          </CreateImgContainer>
          <input
            className="fileInp"
            type="file"
            name="file"
            onChange={uploadToIPFS}
          />
          <input
            type="text"
            className="textInp"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="textarea"
            className="areaInp"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="numInp"
            placeholder="price in ETH"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={createNFT}>Create NFT</Button>
        </CreateForm>
      </CreateNft>
    </CreateContainer>
  );
};

export default Create;

const CreateContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const CreateNft = styled.div`
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

const CreateImgContainer = styled.div`
  width: 100%;
`;
const CreateImg = styled.img`
  width: 100%;
`;

const CreateHeadContainer = styled.div``;

const H1 = styled.h1``;

const Button = styled.button`
  font-size: 20px;
  font-weight: 600;
  padding: 10px 20px;
  border: 0;
  background-color: var(--blue);
  color: white;
  border-radius: 7px;
  margin-top: 20px;
`;

const H5 = styled.h5`
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const CreateForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 35%;
  padding: 30px 0;
  box-shadow: 2px 3px 7px black;
  border-radius: 4px;
  margin: 20px 0;
  .fileInp {
    border: 1px solid grey;
  }
  input {
    margin: 5px 0;
    padding: 10px;
    outline: none;
    width: 90%;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  @media (max-width: 1050px) {
    width: 100%;
    max-width: 735px;
  }
`;
