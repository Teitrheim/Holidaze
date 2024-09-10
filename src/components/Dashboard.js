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
          <p>Name: {user.data.name}</p>
          <p>Email: {user.data.email}</p>
          {user.data.avatar && (
            <img src={user.data.avatar.url} alt={user.data.avatar.alt} />
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
