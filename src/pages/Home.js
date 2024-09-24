import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import banner from "../images/heroimage.jpg";
import ruralImage from "../images/bondhus.jpg";
import hotelImage from "../images/hotel.jpg";
import cultureImage from "../images/city.jpg";
import hardangerImage from "../images/vøringsfossen.jpg";
import "../App.css";
import "./Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/accommodation?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
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
                <Link to="/accommodation?category=rural" className="card-link">
                  <img
                    src={ruralImage}
                    className="card-img-top featured-image"
                    alt="Rural Destination"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Rural</h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <Link to="/accommodation?category=hotels" className="card-link">
                  <img
                    src={hotelImage}
                    className="card-img-top featured-image"
                    alt="Hotels"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Hotels</h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <Link
                  to="/accommodation?category=culture"
                  className="card-link"
                >
                  <img
                    src={cultureImage}
                    className="card-img-top featured-image"
                    alt="Culture and History Tour"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Culture and History Tour</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-location my-5">
        <div className="explore-image-container">
          <img src={hardangerImage} alt="Hardanger" className="img-fluid" />
          <div className="explore-text-overlay">
            <h2>Still figuring out what to do in Norway?</h2>
            <p>Enjoy the comfort of these places while you decide.</p>
            <Link to="/accommodation">
              <button className="btn btn-success">See all locations</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="join-community my-5">
        <div className="text-center">
          <h2>Join the Holidaze Community</h2>
          <p>Sign up to receive exclusive offers and travel updates</p>
          <Link to="/register">
            <button className="btn btn-primary">Sign Up Now</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
