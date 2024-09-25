import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User in Dashboard:", user);

      if (!user.accessToken) {
        console.error("Access token is missing");
        navigate("/login");
        return;
      }

      // Fetch venues owned by the user if they are a venue manager
      if (user.venueManager) {
        fetchUserVenues(user);
      }
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

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
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          `Failed to fetch user venues: ${errorData.errors[0].message}`
        );
      }

      const data = await response.json();
      console.log("Fetched venues:", data);
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
          <div className="user-info">
            {user.avatar && user.avatar.url && (
              <img
                src={user.avatar.url}
                alt={user.avatar.alt || "User Avatar"}
                className="user-avatar"
              />
            )}
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
          {user.venueManager ? (
            <div className="user-venues">
              <div className="section-header">
                <h2>Your Venues</h2>
                <div className="venue-actions">
                  <Link to="/create-venue">
                    <button className="btn btn-primary">
                      Create New Venue
                    </button>
                  </Link>
                  <Link to="/venue-bookings">
                    <button className="btn btn-secondary">
                      View Venue Bookings
                    </button>
                  </Link>
                </div>
              </div>
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <div key={venue.id} className="venue-item">
                    <h3>{venue.name}</h3>
                    <p>{venue.description}</p>
                    <div className="venue-actions">
                      <Link to={`/edit-venue/${venue.id}`}>
                        <button className="btn btn-secondary">
                          Edit Venue
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteVenue(venue.id)}
                      >
                        Delete Venue
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have not created any venues yet.</p>
              )}
            </div>
          ) : (
            <div className="customer-options">
              <div className="section-header">
                <h2>Your Bookings</h2>
              </div>
              <div className="booking-actions">
                <Link to="/my-bookings">
                  <button className="btn btn-primary">View My Bookings</button>
                </Link>
                <Link to="/accommodation">
                  <button className="btn btn-secondary">Book a Venue</button>
                </Link>
              </div>
            </div>
          )}
          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/profile-edit")}
            >
              Edit Profile / Update Avatar
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
