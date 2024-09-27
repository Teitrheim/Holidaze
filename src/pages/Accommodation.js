// Accommodation.js

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import "./Accommodation.css";

function Accommodation() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "";
  const searchTermFromURL = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
  const [category, setCategory] = useState(categoryFromURL);
  const [services, setServices] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        let url = "https://v2.api.noroff.dev/holidaze/venues?_meta=true";

        if (searchTerm) {
          url = `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(
            searchTerm
          )}&_meta=true`;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load venues.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, [searchTerm]);

  // Filtering based on category, search term, and services
  const filteredVenues = venues.filter((venue) => {
    const venueName = venue.name ? venue.name.toLowerCase() : "";
    const matchesSearchTerm =
      searchTerm === "" || venueName.includes(searchTerm.toLowerCase());

    // Categorize venues
    let matchesCategory = true;
    if (category) {
      if (category === "rural") {
        matchesCategory = venue.description
          ? venue.description.toLowerCase().includes("rural")
          : false;
      } else if (category === "hotel") {
        matchesCategory = venue.description
          ? venue.description.toLowerCase().includes("hotel")
          : false;
      } else if (category === "luxury") {
        matchesCategory = venue.price >= 200;
      } else if (category === "budget") {
        matchesCategory = venue.price <= 100;
      } else if (category === "family") {
        matchesCategory = venue.maxGuests >= 4;
      } else if (category === "romantic") {
        matchesCategory = venue.description
          ? venue.description.toLowerCase().includes("romantic")
          : false;
      } else if (category === "beach") {
        matchesCategory = venue.description
          ? venue.description.toLowerCase().includes("beach")
          : false;
      } else if (category === "mountain") {
        matchesCategory = venue.description
          ? venue.description.toLowerCase().includes("mountain")
          : false;
      } else {
        matchesCategory = true;
      }
    }

    // Filter by services
    let matchesServices = true;
    if (services) {
      matchesServices = venue.meta && venue.meta[services] === true;
    }

    return matchesCategory && matchesSearchTerm && matchesServices;
  });

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="accommodation-page">
      <h1 className="text-center my-4">Accommodation</h1>

      {/* Search and Filter section */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={4} className="mb-2">
          <Form.Select
            aria-label="Categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Categories</option>
            <option value="rural">Rural</option>
            <option value="hotel">Hotels</option>
            <option value="luxury">Luxury</option>
            <option value="budget">Budget</option>
            <option value="family">Family</option>
            <option value="romantic">Romantic</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3} className="mb-2">
          <label htmlFor="venueSearch" className="visually-hidden">
            Search Venues:
          </label>
          <Form.Control
            type="text"
            id="venueSearch"
            placeholder="Find by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4} className="mb-2">
          <Form.Select
            aria-label="Services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          >
            <option value="">Services</option>
            <option value="wifi">Wi-Fi</option>
            <option value="parking">Parking</option>
            <option value="breakfast">Breakfast</option>
            <option value="pets">Pets Allowed</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Display Venues */}
      <Row>
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <Col xs={12} md={6} lg={4} key={venue.id} className="mb-4">
              <div className="venue-card h-100">
                <Link
                  to={`/venue/${venue.id}`}
                  className="text-decoration-none"
                >
                  <img
                    className="venue-image img-fluid"
                    src={venue.media[0]?.url}
                    alt={venue.media[0]?.alt || venue.name}
                  />
                  <h2 className="mt-2">{venue.name}</h2>
                  <p>{venue.description}</p>
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <p>No venues found for this category or search term.</p>
        )}
      </Row>
    </Container>
  );
}

export default Accommodation;
