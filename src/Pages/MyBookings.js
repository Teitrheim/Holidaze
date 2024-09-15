import React, { useState, useEffect } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = user.accessToken;
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [user.name, user.accessToken]);

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
