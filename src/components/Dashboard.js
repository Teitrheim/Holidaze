import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("User from localStorage:", parsedUser);
    } else {
      // Redirect to login if no user data is found
      navigate("/login");
    }
  }, [navigate]);

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
          <button onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
