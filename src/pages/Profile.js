import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Link } from "react-router-dom";

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

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="profile-container">
      <h1>{user.name}'s Profile</h1>
      {user.avatar && user.avatar.url && (
        <img
          src={user.avatar.url}
          alt={user.avatar.alt || "User Avatar"}
          className="profile-avatar"
        />
      )}
      <p>Email: {user.email}</p>
      <Link to="/profile-edit">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default Profile;
