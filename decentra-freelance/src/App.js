import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Foot from "./component/Foot";

function App() {
  return (
    <Wrapper>
      <Navbar />
      <Home />
      <Foot />
    </Wrapper>
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
