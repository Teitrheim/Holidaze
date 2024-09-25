import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./VenueBookings.css";

function VenueBookings() {
  const { user } = useContext(UserContext);
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.venueManager) {
      navigate("/login");
      return;
    }

    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/venues?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
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
  }, [user, navigate]);

  return (
    <div className="venue-bookings-container">
      <h1>Venue Bookings</h1>
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div key={venue.id} className="venue-card">
            <h2>{venue.name}</h2>
            {venue.bookings && venue.bookings.length > 0 ? (
              venue.bookings.map((booking) => (
                <div key={booking.id} className="booking-details">
                  <p>
                    Booking ID: {booking.id}
                    <br />
                    From: {new Date(booking.dateFrom).toLocaleDateString()} To:{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                    <br />
                    Guests: {booking.guests}
                  </p>
                </div>
              ))
            ) : (
              <p>No bookings for this venue.</p>
            )}
          </div>
        ))
      ) : (
        <p>You have not created any venues.</p>
      )}
    </div>
  );
}

export default VenueBookings;
