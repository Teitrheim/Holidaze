import React, { useEffect, useState } from "react";
import "./Profile.css"; 

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.bio && <p>Bio: {user.bio}</p>}
          {user.avatar && <img src={user.avatar.url} alt={user.avatar.alt} />}
        </div>
      ) : (
        <p>Loading profile info...</p>
      )}
    </div>
  );
}

export default Profile;
