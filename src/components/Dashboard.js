import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
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
      // Redirect to login if no user data is found
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

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.avatar && (
            <img
              src={user.avatar.url}
              alt={user.avatar.alt || "User Avatar"}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          )}
          {/* If the user is a venue manager, display their venues */}
          {user.venueManager && (
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
                  </div>
                ))
              ) : (
                <p>You have not created any venues yet.</p>
              )}
            </div>
          )}
          <button onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
