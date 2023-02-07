import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Marketplace from "./pages/Marketplace";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpecialOffer from "./pages/SpecialOffer";
import Backpain from "./pages/illness/Backpain";
import Neckpain from "./pages/illness/Neckpain";
import Headache from "./pages/illness/Headache";
import Pediatric from "./pages/illness/Pediatric";
import Pregnancy from "./pages/illness/Pregnancy";
import Wellness from "./pages/illness/Wellness";
import ScrollToTop from "./components/ScrollToTop";
import TokenItem from "./components/pass/TokenItem";
import Meet from "./pages/about/Meet";
import Testimonials from "./pages/about/Testimonials";
import Tour from "./pages/about/Tour";
import Products from "./pages/patients/Products";
import Paperwork from "./pages/patients/Paperwork";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/marketplace" element={<Marketplace />} />
          <Route exact path="/special" element={<SpecialOffer />} />
          <Route exact path="/backpain" element={<Backpain />} />
          <Route exact path="/neckpain" element={<Neckpain />} />
          <Route exact path="/headache" element={<Headache />} />
          <Route exact path="/pediatric" element={<Pediatric />} />
          <Route exact path="/pregnancy" element={<Pregnancy />} />
          <Route exact path="/wellness" element={<Wellness />} />
          <Route exact path="/us" element={<Meet />} />
          <Route exact path="/testimonials" element={<Testimonials />} />
          <Route exact path="/office-tour" element={<Tour />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/filloutForm" element={<Paperwork />} />
          <Route exact path="/marketplace/0" element={<TokenItem id={0} />} />
          <Route exact path="/marketplace/1" element={<TokenItem id={1} />} />
          <Route exact path="/marketplace/2" element={<TokenItem id={2} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
