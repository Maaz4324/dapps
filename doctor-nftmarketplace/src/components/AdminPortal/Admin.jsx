import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import pass from "../../contracts/Pass.sol/Pass.json";

function Admin() {
  const [arrBuyers, setArrBuyers] = useState([]);
  const web3Handler = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const abi = pass.abi;

  const passContract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    async function listBuyers() {
      try {
        const list = await passContract.showAllBuyers();
        // console.log(list);
        for (let i = 0; i < list.length; i++) {
          const buyerPass = await passContract.buyerPass(list[i]);
          const duration = await passContract.duration(list[i]);
          //   console.log(buyerPass.toString());
          //   console.log(duration.toString());

          var result = [
            {
              address: list[i],
              addrPass: buyerPass.toString(),
              addrDuration: duration.toString(),
            },
          ];
          //   console.log(result);
          setArrBuyers(result);
          //   console.log(arrBuyers);
        }
      } catch (error) {
        console.log(error);
      }
    }
    listBuyers();
    console.log(arrBuyers);
  }, []);

  return (
    <AdminContainer>
      <Container>
        <Button onClick={web3Handler}>Connect Metamask</Button>
        <BuyerList>
          {/* {arrBuyers.map((arrBuyer) => {
            arrBuyer.map((arraybuyer) => (
              <div>
                <div>{arraybuyer.address}</div>
                <div>{arraybuyer.addrPass}</div>
                <div>{arraybuyer.addrDuration}</div>
              </div>
            ));
          })} */}
        </BuyerList>
      </Container>
    </AdminContainer>
  );
}

export default Admin;

const AdminContainer = styled.div`
  width: 100%;
  height: 100vh;
  border: 2px solid red;
  padding: 90px;
  @media (max-width: 991px) {
    padding: 10px;
  }
`;

const Container = styled.div`
  border: 2px solid blue;
  max-width: 1047px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
`;

const BuyerList = styled.div``;

const Button = styled.button`
  padding: 7px 20px;
  font-size: 20px;
  border: 0;
  margin-top: 20px;
  background-image: linear-gradient(to right, #b7f9ff, #22c0db);
  width: 30%;
  &:hover {
    transition: all 0.3s;
    background-image: linear-gradient(to right, #f2f2f2, #bdbdbd);
  }
`;
