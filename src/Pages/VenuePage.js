import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VenuePage.css";

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Fetch the venue details
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

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    const bookingData = {
      dateFrom,
      dateTo,
      guests: parseInt(guests),
      venueId: id,
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const result = await response.json();
      setBookingSuccess("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingError("Failed to create booking. Please try again.");
    }
  };

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
          <span>Price per night: ${venue.price}</span>
          <span>Maximum Guests: {venue.maxGuests}</span>
          <span>Rating: {venue.rating || "No rating yet"}</span>
        </div>

        {/* Booking Form */}
        <div className="booking-form">
          <h2>Book This Venue</h2>
          <form onSubmit={handleBooking}>
            <div>
              <label htmlFor="dateFrom">Start Date:</label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="dateTo">End Date:</label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                max={venue.maxGuests}
                required
              />
            </div>
            <button type="submit">Book Now</button>
          </form>

          {/* Display booking success or error messages */}
          {bookingSuccess && (
            <p className="success-message">{bookingSuccess}</p>
          )}
          {bookingError && <p className="error-message">{bookingError}</p>}
        </div>
      </div>
    </div>
  );
}

export default VenuePage;
