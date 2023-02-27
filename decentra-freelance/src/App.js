import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Foot from "./component/Foot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Selling from "./pages/Selling";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Buying from "./pages/Buying";

function App() {
  const activeChainId = ChainId.Mainnet;
  return (
    <Router>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/developer"
            element={<Buying category="programming" />}
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
