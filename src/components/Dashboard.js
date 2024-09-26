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
      if (!user.accessToken) {
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
        throw new Error(
          `Failed to fetch user venues: ${errorData.errors[0].message}`
        );
      }

      const data = await response.json();
      setVenues(data.data);
    } catch (error) {}
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
      alert("An error occurred while deleting the venue.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div>
          <div className="user-info card">
            <div className="card-body text-center">
              {user.avatar && user.avatar.url && (
                <img
                  src={user.avatar.url}
                  alt={user.avatar.alt || "User Avatar"}
                  className="user-avatar"
                />
              )}
              <h2 className="user-name">{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <div className="action-buttons mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/profile")}
                >
                  View Profile
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/profile-edit")}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {user.venueManager ? (
            <div className="user-venues mt-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Your Venues</h2>
                <div>
                  <Link to="/create-venue" className="btn btn-success me-2">
                    Create New Venue
                  </Link>
                  <Link to="/venue-bookings" className="btn btn-info">
                    View Venue Bookings
                  </Link>
                </div>
              </div>
              {venues.length > 0 ? (
                <div className="venue-list">
                  {venues.map((venue) => (
                    <div key={venue.id} className="venue-item card mb-3">
                      <div className="card-body">
                        <h3 className="card-title">{venue.name}</h3>
                        <p className="card-text">{venue.description}</p>
                        <div className="venue-actions mt-3">
                          <Link
                            to={`/edit-venue/${venue.id}`}
                            className="btn btn-primary me-2"
                          >
                            Edit Venue
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteVenue(venue.id)}
                          >
                            Delete Venue
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>You have not created any venues yet.</p>
                  <Link to="/create-venue" className="btn btn-success">
                    Create Your First Venue
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="customer-options mt-5">
              <h2>Your Bookings</h2>
              <div className="booking-actions mt-3">
                <Link to="/my-bookings" className="btn btn-primary me-2">
                  View My Bookings
                </Link>
                <Link to="/accommodation" className="btn btn-secondary">
                  Book a Venue
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
