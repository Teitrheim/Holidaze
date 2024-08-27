import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import banner from "./images/heroimage.jpg";
import ruralImage from "./images/bondhus.jpg";
import hotelImage from "./images/hotel.jpg";
import cultureImage from "./images/city.jpg";
import hardangerImage from "./images/vøringsfossen.jpg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
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

        <section className="featured-destinations">
          <h2 className="text-center my-5">Featured Destinations</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img
                    src={ruralImage}
                    className="card-img-top"
                    alt="Rural Destination"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Rural</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img src={hotelImage} className="card-img-top" alt="Hotels" />
                  <div className="card-body">
                    <h5 className="card-title">Hotels</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img
                    src={cultureImage}
                    className="card-img-top"
                    alt="Culture and History Tour"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Culture and History Tour</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="explore-location my-5">
          <div className="explore-image-container">
            <img src={hardangerImage} alt="Hardanger" className="img-fluid" />
            <div className="explore-text-overlay">
              <h2>Still figuring out what to do in Hardanger?</h2>
              <p>Enjoy the comfort of these places while you decide.</p>
              <button className="btn btn-success">See all locations</button>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
