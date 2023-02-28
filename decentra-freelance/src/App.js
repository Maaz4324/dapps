import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Foot from "./component/Foot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Selling from "./pages/Selling";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Buying from "./pages/Buying";
import { useState, useEffect } from "react";
import { categoryData } from "./assets/category";
import ScrollToTop from "./ScrollToTop";
import SellerProfile from "./pages/SellerProfile";

function App() {
  const activeChainId = ChainId.Mainnet;
  const [searchData, setSearchData] = useState("");
  const [sellerData, setSellerData] = useState("");

  return (
    <Router>
      <Wrapper>
        <Navbar searchState={setSearchData} />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path={localStorage.getItem("searchReq")}
            element={
              <Buying
                category={localStorage.getItem("searchReq")}
                sellerState={setSellerData}
              />
            }
          />
          {categoryData.map((data, idx) => (
            <Route
              exact
              path={data.link}
              key={idx}
              element={
                <Buying category={data.link} sellerState={setSellerData} />
              }
            />
          ))}
          <Route
            exact
            path={"/seller/" + localStorage.getItem("sellerId").slice(2)}
            element={
              <SellerProfile
                setSellerState={localStorage.getItem("sellerId")}
              />
            }
          />
          <Route
            exact
            path="/selling"
            element={
              <ThirdwebProvider activeChain={activeChainId}>
                <Selling />
              </ThirdwebProvider>
            }
          />
        </Routes>
        <Foot />
      </Wrapper>
    </Router>
  );
}

export default App;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right, #111118, #161727, #1a1c35);
  color: white;
`;
