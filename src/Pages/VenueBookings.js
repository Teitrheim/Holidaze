import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VenueBookings() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const userName = JSON.parse(localStorage.getItem("user")).name;
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}/venues?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="venue-bookings-container">
      <h1>Your Venue Bookings</h1>
      {venues.map((venue) => (
        <div key={venue.id} className="venue-item">
          <h2>{venue.name}</h2>
          {venue.bookings && venue.bookings.length > 0 ? (
            venue.bookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <p>
                  Date From: {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p>Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                <p>Guests: {booking.guests}</p>
                <p>Customer: {booking.customer.name}</p>
              </div>
            ))
          ) : (
            <p>No bookings for this venue.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default VenueBookings;
