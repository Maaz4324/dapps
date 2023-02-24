import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Foot from "./component/Foot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Selling from "./pages/Selling";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

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
            path="/selling"
            element={
              <ThirdwebProvider desiredChainId={activeChainId}>
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
  background: var(--bg);
  color: white;
  padding-top: 72px;
`;
