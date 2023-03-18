import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../component/Loading";
import { ethers } from "ethers";
import SkillSwap from "../artifacts/contracts/SkillSwap.sol/SkillSwap.json";
import { useNavigate } from "react-router-dom";
import { categoryData } from "../assets/category";

function Gig({ sellerState }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listGig, setListGig] = useState([]);

  function RenderSeller(e, to) {
    e.preventDefault();
    console.log(to);
    navigate("/seller/" + to.slice(2).toLowerCase());
    sellerState(to);
    localStorage.setItem("sellerId", to.toLowerCase());
  }

  useEffect(() => {
    async function loadAllGigs() {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const abi = SkillSwap.abi;

      const contractAddress = "0x239C71B812e5394e28B75De4d2DCDEBB654a3df1";

      const skillswap = new ethers.Contract(contractAddress, abi, signer);

      const noOfSeller = await skillswap.noOfSellers();
      let categoryArr = [];
      let gigsArr = [];
      for (let i = 1; i <= noOfSeller.toString(); i++) {
        console.log(i);
        const user = await skillswap.sellerProfile(i);
        const response = await fetch(user.uri);
        const metadata = await response.json();
        const categoryWords = metadata.gig.gigCategory;
        categoryArr.push(categoryWords);
        let result = {
          data: metadata.gig,
          address: user.seller,
        };
        console.log(user.seller);
        gigsArr.push(result);
      }
      setListCategory(categoryArr);
      setListGig(gigsArr);

      setLoading(false);
    }
    loadAllGigs();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Head>All Sellers Are Listed Here</Head>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro iste
          minus et eum delectus! Aliquam odit, tenetur reprehenderit omnis
          excepturi iste odio? Rerum corrupti doloremque ad cum earum
          consequatur cumque!
        </Text>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {listCategory.map((gig, idx) => (
              <GigSection key={idx}>
                <GigHead>
                  <h3>{gig}</h3>
                  {categoryData.map((c, no) => (
                    <div key={no}>{c.head == gig && <Des>{c.text}</Des>}</div>
                  ))}
                </GigHead>
                <Box>
                  {listGig.map((value, id) => (
                    <CardContainer>
                      {value.data.gigCategory == gig && (
                        <Card
                          key={id}
                          onClick={(e) => RenderSeller(e, value.address)}
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://gateway.ipfscdn.io/ipfs/${value.data.gigImg})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              width: "100%",
                              height: "30vh",
                            }}
                          ></div>
                          <CardText>
                            <h5>{value.data.userName}</h5>
                            <h4>{value.data.gigHead}</h4>
                            <Line />
                            <p>
                              starting at
                              <span> {value.data.gigPrice}Eth</span>
                            </p>
                          </CardText>
                        </Card>
                      )}
                    </CardContainer>
                  ))}
                </Box>
              </GigSection>
            ))}
          </div>
        )}
      </Container>
    </Wrapper>
  );
}

export default Gig;

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Container = styled.section`
  width: 97%;
  max-width: 1247px;
  margin: 0 auto;
  min-height: 80vh;
  padding-top: 80px;
`;

const GigSection = styled.section`
  padding: 50px 0;
  h3 {
    font-size: 30px;
  }
`;

const Box = styled.section``;

const GigHead = styled.section``;

const Des = styled.p`
  margin-bottom: 20px;
  margin-top: 7px;
  color: var(--darkText);
`;

const CardContainer = styled.section`
  display: grid;
  grid-template-columns: 33% 33% auto;
  grid-gap: 20px;
`;

const Card = styled.section`
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: var(--darkBg);
  cursor: pointer;
  border-radius: 8px;
  img {
    width: 100%;
  }
  h4 {
    font-size: 20px;
    font-weight: 200;
    margin: 10px 0;
    color: var(--darkText);
  }
  h5 {
    font-size: 15px;
    font-weight: 200;
  }
  p {
    font-size: 16px;
    color: var(--darkText);
  }
  div {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`;

const Head = styled.h1`
  font-size: 40px;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  width: 73%;
  margin: 0 auto;
  color: var(--darkText);
`;

const CardText = styled.div`
  padding: 20px;
`;

const Line = styled.div`
  border-bottom: 1px solid var(--gray);
  margin: 10px 0;
`;
