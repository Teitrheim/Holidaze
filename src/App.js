import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import banner from "./images/heroimage.jpg";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="banner-image">
          <img src={banner} alt="Scenic View" />
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Enter your destination"
            />
          </div>
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
