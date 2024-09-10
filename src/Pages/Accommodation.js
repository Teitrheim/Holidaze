import React, { useState, useEffect } from "react";
import "./Accommodation.css";
import { Link, useSearchParams } from "react-router-dom";

function Accommodation() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  // Retrieve search query and category from the URL
  const categoryFromURL = searchParams.get("category") || "";
  const searchTermFromURL = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
  const [category, setCategory] = useState(categoryFromURL);
  const [services, setServices] = useState(""); // Service filter

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        let url = "https://v2.api.noroff.dev/holidaze/venues"; //

        if (searchTerm) {
          url = `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(
            searchTerm
          )}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        });

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
  }, [searchTerm]);

  // Filtering based on category, search term, and services
  const filteredVenues = venues.filter((venue) => {
    const venueName = venue.name ? venue.name.toLowerCase() : "";
    const matchesSearchTerm =
      searchTerm === "" || venueName.includes(searchTerm.toLowerCase());

    // Manually categorize venues
    let matchesCategory = true;
    if (category === "rural") {
      matchesCategory = venue.description.toLowerCase().includes("rural");
    } else if (category === "hotels") {
      matchesCategory = venue.description.toLowerCase().includes("hotel");
    }

    // Filter by services (e.g., Wi-Fi, Parking)
    let matchesServices = true;
    if (services) {
      if (services === "wifi") {
        matchesServices = venue.meta?.wifi === true;
      } else if (services === "parking") {
        matchesServices = venue.meta?.parking === true;
      }
    }

    return matchesCategory && matchesSearchTerm && matchesServices;
  });

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
          <option value="rural">Rural</option>
          <option value="hotels">Hotels</option>
          {/* More options here */}
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
          {/* More service options here */}
        </select>

        <button className="btn btn-primary">Search</button>
      </div>

      {/* Display Venues */}
      <div className="venues-list">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div className="venue-card" key={venue.id}>
              <Link to={`/venue/${venue.id}`}>
                <img
                  className="venue-image"
                  src={venue.media[0]?.url}
                  alt={venue.media[0]?.alt || venue.name}
                />
                <h2>{venue.name}</h2>
                <p>{venue.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No venues found for this category or search term.</p>
        )}
      </div>
    </div>
  );
}

export default Accommodation;
