import React from "react";
import styled from "styled-components";
import HomeFoot from "../../components/Home/HomeFoot";
import OfficeHour from "../../components/OfficeHour";
import Fade from "react-reveal/Fade";

function Products() {
  return (
    <ProductContainer>
      <Container>
        <Left>
          <Fade left cascade>
            <h1>NEW LEAF INSPIRED MAMA</h1>
            <h5>Discount Links & Codes!</h5>
            <ol>
              <li>
                Altuerra EMF & 5 G Protection : <a href="#">CLICK HERE</a>
              </li>
              <li>
                Attitude Living-We love them for hand & dish soaps, body wash
                and shampoos! : <a href="#">CLICK HERE</a>
              </li>
              <li>
                Beauty by Earth-we love using some of their self-tanners,
                tinctures and oils : <a href="#">CLICK HERE</a>
              </li>
              <li>
                Crunchi-We love them for all skincare, makeup and baby products!
                : <a href="#">CLICK HERE</a>{" "}
              </li>
              <li>
                Earth Hero-you can find tons of sustainable products on this
                website! The AMAZON of toxin free living! :{" "}
                <a href="#">CLICK HERE</a>
              </li>
              <li>
                Evolvh- My daughter and I love their curly hair system! Great
                haircare company! : <a href="#">CLICK HERE</a>
              </li>
              <li>
                Force of Nature Disinfectant & Cleaning System-we love this for
                disinfectant all over house! - <a href="#">CLICK HERE</a>
              </li>
              <li>
                Mary Ruth’s Organics-We love them for all supplements and
                vitamins! - <a href="#">CLICK HERE</a>
              </li>
              <li>
                Primally Pure-the ONLY deodorant we can use! -{" "}
                <a href="#">CLICK HERE</a>
              </li>
              <li>
                Mary Ruth’s Organics-We love them for all supplements and
                vitamins! - <a href="#">CLICK HERE</a>
              </li>
              <li>
                SeaLove Home-We love them for home scents, candles, and melts! -{" "}
                <a href="#">CLICK HERE</a>
              </li>
              <li>
                Scentfill-We love their plug ins for home and car! -{" "}
                <a href="#">CLICK HERE</a>
              </li>
              <li>
                Truly Free Home-we use their entire line for Laundry and home
                cleaning! - <a href="#">CLICK HERE</a>
              </li>
            </ol>
          </Fade>
        </Left>
        <OfficeHour />
      </Container>
      <HomeFoot />
    </ProductContainer>
  );
}

export default Products;

const ProductContainer = styled.div`
  padding-top: 90px;
  @media (max-width: 990px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1047px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-weight: 800;
    color: var(--headgray);
  }
  h5 {
    font-size: 19px;
    color: var(--headgray);
  }
  ol {
    margin-top: 30px;
  }
  li {
    font-size: 18px;
    color: #424242;
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: var(--blue);
  }
`;

const Left = styled.div`
  width: 70%;
  @media (max-width: 890px) {
    width: 100%;
    border-bottom: 2px solid var(--lightgray);
  }
`;
