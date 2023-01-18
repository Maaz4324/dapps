import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Patients from "./pages/Patients";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Marketplace from "./pages/Marketplace";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/us" element={<About />} />
          <Route exact path="/patients" element={<Patients />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/Marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
