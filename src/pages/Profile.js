import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Profile.css";

function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-banner">
          {user.banner && user.banner.url && (
            <img
              src={user.banner.url}
              alt={user.banner.alt || "Profile Banner"}
              className="banner-img"
            />
          )}
        </div>
        <div className="profile-avatar">
          {user.avatar && user.avatar.url ? (
            <img
              src={user.avatar.url}
              alt={user.avatar.alt || "User Avatar"}
              className="avatar-img"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="email">{user.email}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="profile-actions">
            <Link to="/profile-edit">
              <button className="btn btn-primary">Edit Profile</button>
            </Link>
            {user.venueManager && (
              <Link to="/dashboard">
                <button className="btn btn-secondary">My Dashboard</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
