import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  return (
    <div className="my-bookings-container">
      <h1>My Upcoming Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <h2>{booking.venue.name}</h2>
            <p>Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p>Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
            <p>Guests: {booking.guests}</p>
          </div>
        ))
      ) : (
        <p>You have no upcoming bookings.</p>
      )}
    </div>
  );
}

export default MyBookings;
