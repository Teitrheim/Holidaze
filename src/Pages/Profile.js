import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("User from localStorage:", parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name || "No name available"}</p>
          <p>Email: {user.email || "No email available"}</p>
          {user.avatar && (
            <img
              src={user.avatar.url}
              alt={user.avatar.alt || "User Avatar"}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          )}
          <button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      ) : (
        <p>No user info available</p>
      )}
    </div>
  );
}

export default Profile;
