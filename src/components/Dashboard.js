import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch venues owned by the user if they are a venue manager
      if (parsedUser.venueManager) {
        fetchUserVenues(parsedUser);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserVenues = async (user) => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/venues`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user venues");
      }

      const data = await response.json();
      setVenues(data.data);
    } catch (error) {
      console.error("Error fetching user venues:", error);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }

      // Update the venues state after deletion
      setVenues(venues.filter((venue) => venue.id !== venueId));
      alert("Venue deleted successfully.");
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("An error occurred while deleting the venue.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.avatar && user.avatar.url && (
            <img
              src={user.avatar.url}
              alt={user.avatar.alt || "User Avatar"}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          )}
          {user.venueManager ? (
            <div className="user-venues">
              <h2>Your Venues</h2>
              <Link to="/create-venue">
                <button className="btn btn-primary">Create New Venue</button>
              </Link>
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <div key={venue.id} className="venue-item">
                    <h3>{venue.name}</h3>
                    <p>{venue.description}</p>
                    <Link to={`/edit-venue/${venue.id}`}>
                      <button className="btn btn-secondary">Edit Venue</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteVenue(venue.id)}
                    >
                      Delete Venue
                    </button>
                  </div>
                ))
              ) : (
                <p>You have not created any venues yet.</p>
              )}
            </div>
          ) : (
            <div className="customer-options">
              <h2>Your Bookings</h2>
              <Link to="/my-bookings">
                <button className="btn btn-primary">View My Bookings</button>
              </Link>
              <Link to="/accommodation">
                <button className="btn btn-secondary">Book a Venue</button>
              </Link>
            </div>
          )}
          <button onClick={() => navigate("/profile")}>Go to Profile</button>
          <button onClick={() => navigate("/profile-edit")}>
            Edit Profile / Update Avatar
          </button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
