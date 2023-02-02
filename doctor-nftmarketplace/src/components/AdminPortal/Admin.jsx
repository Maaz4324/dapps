import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import pass from "../../contracts/Pass.sol/Pass.json";

function Admin() {
  const [arrBuyers, setArrBuyers] = useState([]);

  useEffect(() => {
    const web3Handler = async () => {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    };
    web3Handler();
  }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const abi = pass.abi;

  const passContract = new ethers.Contract(contractAddress, abi, signer);

  async function listBuyers() {
    try {
      const list = await passContract.showAllBuyers();
      if (list.length != arrBuyers.length) {
        for (let i = 0; i < list.length; i++) {
          const buyerPass = await passContract.buyerPass(list[i]);
          const duration = await passContract.duration(list[i]);
          let patientPass;
          if (buyerPass.toString() == 1) {
            patientPass = "Basic";
          }
          if (buyerPass.toString() == 2) {
            patientPass = "Standard";
          }
          if (buyerPass.toString() == 3) {
            patientPass = "Premium";
          }

          function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1000);
            var months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time =
              date +
              " " +
              month +
              " " +
              year +
              " " +
              hour +
              ":" +
              min +
              ":" +
              sec;
            return time;
          }

          var result = [
            {
              address: list[i],
              addrPass: patientPass,
              addrDuration: timeConverter(duration.toString()),
            },
          ];
          setArrBuyers((prev) => [...prev, result]);
        }
      } else {
        alert("No new patient");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminContainer>
      <Container>
        <BuyerList>
          {arrBuyers.map((arrBuyer) =>
            arrBuyer.map((arraybuyer, index) => (
              <ListContainer key={index}>
                <div>
                  Address of patient: <b>{arraybuyer.address}</b>
                </div>
                <div>
                  Patient bought: <b>{arraybuyer.addrPass}</b>
                </div>
                <div>
                  Holding since: <b>{arraybuyer.addrDuration}</b>
                </div>
              </ListContainer>
            ))
          )}
        </BuyerList>
        <Button onClick={listBuyers}>Show Patients</Button>
      </Container>
    </AdminContainer>
  );
}

export default Admin;

const AdminContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 90px;
  @media (max-width: 991px) {
    padding: 10px;
  }
`;

const Container = styled.div`
  max-width: 1047px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const BuyerList = styled.div``;

const ListContainer = styled.div`
  margin: 10px;
  padding: 10px;
  background-image: linear-gradient(to right, #f2f2f2, #bdbdbd);
  cursor: pointer;
`;

const Button = styled.button`
  padding: 7px 20px;
  font-size: 20px;
  border: 0;
  margin-top: 20px;
  background-image: linear-gradient(to right, #b7f9ff, #22c0db);
  width: 30%;
  align-self: center;
  &:hover {
    transition: all 0.3s;
    background-image: linear-gradient(to right, #f2f2f2, #bdbdbd);
  }
`;
