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

function App() {
  const activeChainId = ChainId.Mainnet;
  const [searchData, setSearchData] = useState("");

  function getState() {
    console.log("searchData");
  }

  return (
    <Router>
      <Wrapper>
        <Navbar searchState={setSearchData} onClick={getState} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path={searchData}
            element={<Buying category={searchData} />}
          />
          {categoryData.map((data, idx) => (
            <Route
              exact
              path={data.link}
              element={<Buying category={data.link} />}
            />
          ))}
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
