// src/pages/ProfileEdit.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.avatar) {
        setAvatarUrl(parsedUser.avatar.url || "");
        setAvatarAlt(parsedUser.avatar.alt || "");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify({
            avatar: {
              url: avatarUrl,
              alt: avatarAlt,
            },
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0].message}`);
        return;
      }
      const data = await response.json();
      // Update localStorage and user state
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("An error occurred while updating the profile.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-edit-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <div className="form-group">
          <label>Avatar URL:</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Avatar Alt Text:</label>
          <input
            type="text"
            value={avatarAlt}
            onChange={(e) => setAvatarAlt(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Avatar
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
