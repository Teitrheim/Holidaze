import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import banner from "./images/heroimage.jpg";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="banner-image">
          <img src={banner} alt="Scenic View" style={{ height: "300px" }} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
