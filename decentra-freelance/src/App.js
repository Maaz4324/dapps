import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Wrapper>
      <Navbar />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  color: white;
`;
