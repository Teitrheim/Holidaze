import React, { useState, useEffect } from "react";
import "./Accommodation.css";

function Accommodation() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [services, setServices] = useState("");

  // Fetching the venues from API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(data.data); // Update the venues state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Filtering and searching venues
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Rendering logic
  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="accommodation-page">
      <h1>Accommodation</h1>

      {/* Search and Filter section */}
      <div className="search-filter-container">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categories</option>
          <option value="hotel">Hotels</option>
          <option value="rural">Rural</option>
          {/* Add more options here! */}
        </select>

        <input
          type="text"
          placeholder="Find by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={services} onChange={(e) => setServices(e.target.value)}>
          <option value="">Services</option>
          <option value="wifi">Wi-Fi</option>
          <option value="parking">Parking</option>
          {/* Add more service options */}
        </select>

        <button className="btn btn-primary">Search</button>
      </div>

      {/* Display Venues */}
      <div className="venues-list">
        {filteredVenues.map((venue) => (
          <div className="venue-card" key={venue.id}>
            <img
              className="venue-image"
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt || venue.name}
            />
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
