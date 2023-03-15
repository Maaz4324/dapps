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
import Chat from "./pages/Chat";
import Order from "./pages/Order";
import supabase from "./supabaseClient";

function App() {
  const activeChainId = ChainId.Mainnet;
  const [searchData, setSearchData] = useState("");
  const [sellerData, setSellerData] = useState("");
  const [changeSearch, setChangeSearch] = useState("");

  useEffect(() => {
    setChangeSearch(localStorage.getItem("searchReq"));
    // eslint - disable - next - line;
  }, [searchData]);

  useEffect(() => {
    async function testSupa() {
      const { data, error } = await supabase.from("test1").select();
      // console.log(supabase);

      if (error) {
        console.log(error);
      }
      if (data) {
        // console.log(data);
      }
    }
    testSupa();
  }, []);

  async function testInsert() {
    console.log("clicked");
    const { data, error } = await supabase
      .from("test1")
      .insert([{ name: "testname", age: "23" }]);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  return (
    <Router>
      <Wrapper>
        <Navbar searchState={setSearchData} />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route
            exact
            path={"/chat/"}
            element={<Chat chatSellerId={localStorage.getItem("sellerId")} />}
          />
          <Route
            exact
            path={changeSearch}
            element={
              <Buying category={changeSearch} sellerState={setSellerData} />
            }
          />
          {categoryData.map((data, idx) => (
            <Route
              exact
              path={data.link}
              element={
                <Buying
                  key={idx}
                  category={data.link}
                  sellerState={setSellerData}
                />
              }
            />
          ))}
          <Route
            exact
            path={
              localStorage.getItem("sellerId") == undefined
                ? ""
                : "/seller/" + localStorage.getItem("sellerId").slice(2)
            }
            element={
              <SellerProfile
                setSellerState={localStorage.getItem("sellerId")}
              />
            }
          />
          <Route exact path="/order" element={<Order />} />
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
        <button onClick={testInsert}>Click here to test supabase</button>
        <Foot />
      </Wrapper>
    </Router>
  );
}

export default App;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: var(--black);
  color: white;
`;
