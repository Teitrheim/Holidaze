import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VenuePage.css";

function VenuePage() {
  const { id } = useParams(); // Get the venue ID from the URL
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }

        const data = await response.json();
        setVenue(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setError("Failed to load venue details.");
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="venue-page">
      <div className="venue-card">
        <img
          className="venue-image"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
        <h1>{venue.name}</h1>
        <p>{venue.description}</p>

        <div className="venue-details">
          <span>Price per night:</span> ${venue.price}
          <span>Maximum Guests:</span> {venue.maxGuests}
          <span>Rating:</span> {venue.rating || "No rating yet"}
        </div>

        <div className="venue-meta">
          <span>City: {venue.location.city || "N/A"}</span>
          <span>Country: {venue.location.country || "N/A"}</span>
        </div>

        <ul className="venue-amenities">
          {venue.meta.wifi && <li>WiFi</li>}
          {venue.meta.parking && <li>Parking</li>}
          {venue.meta.breakfast && <li>Breakfast</li>}
          {venue.meta.pets && <li>Pets Allowed</li>}
        </ul>

        <button>Book Now</button>
      </div>
    </div>
  );
}

export default VenuePage;
