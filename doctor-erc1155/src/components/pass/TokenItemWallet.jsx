import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nft from "../../contracts copy/Pass.sol/Pass.json";
import Market from "../../contracts copy/PassMarket.sol/PassMarket.json";
import { ethers } from "ethers";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

function TokenItemWallet({ id }) {
  const [items, setItems] = useState([]);
  const [holdAmount, setHoldAmount] = useState();
  const [open, setOpen] = React.useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const nftAbi = Nft.abi;
  const marketAbi = Market.abi;

  const nftAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
  const marketAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  const nft = new ethers.Contract(nftAddress, nftAbi, signer);
  const market = new ethers.Contract(marketAddress, marketAbi, signer);

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const item = await market.items(id);

    let totalPrice = item.price.toString();
    const uri = `https://ipfs.io/ipfs/bafybeiao7s6ljdmxcn4f7di5t23iphrq4rxcdx5lrhjevblir57ah65o3q/${id}.json`;

    const response = await fetch(`${uri}`);
    const metadata = await response.json();

    let arr = [];
    let ownersArr = [];
    for (let j = 1; j <= item.owners.toString(); j++) {
      let ownersList = await market.viewOwnerslist(id, j);
      let balance = await nft.balanceOf(ownersList, id);
      arr.push(ownersList + " : " + balance + "tokens");
    }
    function removeDuplicates(array) {
      ownersArr.push(array.filter((a, b) => array.indexOf(a) === b));
    }
    removeDuplicates(arr);
    let itemList = [
      {
        totalPrice,
        itemId: id,
        owners: ownersArr[0].length + 1,
        name: metadata.name,
        amount: metadata.amount,
        image: metadata.image.replace("ipfs://", ""),
        description: metadata.discription,
        ownersArray: ownersArr[0],
      },
    ];
    setItems(itemList);
  };

  const buyMarketItem = async (item) => {
    console.log(item.itemId);
    console.log(nft.address);
    console.log(item.totalPrice);
    let value = item.totalPrice / 1000000000000000000;
    console.log(value);
    console.log(holdAmount);
    let totalCost = value * holdAmount;
    await (
      await market.PurchaseItem(item.itemId, nftAddress, holdAmount, {
        value: ethers.utils.parseEther(totalCost.toString()),
      })
    ).wait();
    setHoldAmount("");
    loadMarketplaceItems();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <TokenItemWalletContainer>
      {items.map((item, idx) => (
        <Container key={idx}>
          <Left>
            <ImgContainer>
              <img
                src={`https://ipfs.io/ipfs/${item.image}`}
                alt="not available"
              />
            </ImgContainer>
          </Left>
          <Right>
            <Head>
              <H1>{item.name}</H1>
              <div className="underName" style={{ marginBottom: "20px" }}>
                <LightTitle style={{ marginRight: "20px" }}>
                  {item.amount} tokens in total
                </LightTitle>

                <LightTitle
                  style={{
                    margin: "10px 0",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  {item.owners} Owners
                </LightTitle>
              </div>
              <H5 style={{ margin: "20px 0" }}>
                {" "}
                <LightTitle>About</LightTitle>
                <br /> {item.description}
              </H5>
            </Head>
            <H1>
              <LightTitle>Price</LightTitle>
              <br /> {ethers.utils.formatEther(item.totalPrice)} ETH
              <LightTitle> 4865.37 usd</LightTitle>
            </H1>
            <BuyBtn>
              <input
                type="number"
                placeholder="Set amount"
                onChange={(e) => setHoldAmount(e.target.value)}
                defaultValue={holdAmount}
              />
              <Button onClick={() => buyMarketItem(item)}>Buy now</Button>
            </BuyBtn>
          </Right>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p id="modal-modal-title" variant="h6" component="h2">
                {item.ownersArray.map((ownerArr, index) => (
                  <p key={index}>{ownerArr}</p>
                ))}
              </p>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </Box>
          </Modal>
        </Container>
      ))}
    </TokenItemWalletContainer>
  );
}

export default TokenItemWallet;

const TokenItemWalletContainer = styled.div`
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

const Head = styled.div`
  .underName {
    display: flex;
    align-items: center;
    justify-content: start;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

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
