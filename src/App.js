import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import banner from "./images/heroimage.jpg";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
   
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Router>
      <div>
        <Header />
        <div className="banner-image">
          <img src={banner} alt="Scenic View" />
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your destination"
              value={searchTerm}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
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
