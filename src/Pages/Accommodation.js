import React, { useState, useEffect } from "react";
import "./Accommodation.css";

function Accommodation() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setVenues(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="accommodation-page container">
      <h1>Accommodation</h1>
      <div className="search-filter-container row mb-4">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <select className="form-control">
            <option>Categories</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Find by name..."
          />
        </div>
        <div className="col-12 col-md-4">
          <select className="form-control">
            <option>Services</option>
            {/* Add other services here */}
          </select>
        </div>
      </div>
      <div className="venues-list row">
        {venues.map((venue) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={venue.id}
          >
            <div className="venue-card h-100">
              <img
                src={venue.media[0]?.url}
                alt={venue.media[0]?.alt || venue.name}
                className="venue-image"
              />
              <h2>{venue.name}</h2>
              <p>{venue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
