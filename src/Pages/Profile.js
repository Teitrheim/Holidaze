import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("User from localStorage:", parsedUser);
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.data.name}</p>
          <p>Email: {user.data.email}</p>
          {user.data.bio && <p>Bio: {user.data.bio}</p>}
          {user.data.avatar && (
            <img src={user.data.avatar.url} alt={user.data.avatar.alt} />
          )}
        </div>
      ) : (
        <p>Loading profile info...</p>
      )}
    </div>
  );
}

export default Profile;
