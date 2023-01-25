import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Patients from "./pages/Patients";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Marketplace from "./pages/Marketplace";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpecialOffer from "./pages/SpecialOffer";
import Backpain from "./pages/Backpain";
import Neckpain from "./pages/Neckpain";
import Headache from "./pages/Headache";
import Pediatric from "./pages/Pediatric";
import Pregnancy from "./pages/Pregnancy";
import Wellness from "./pages/Wellness";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/us" element={<About />} />
          <Route exact path="/patients" element={<Patients />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
