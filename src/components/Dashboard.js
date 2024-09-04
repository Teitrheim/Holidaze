import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
          {user.avatar && <img src={user.avatar.url} alt={user.avatar.alt} />}
          <button onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
