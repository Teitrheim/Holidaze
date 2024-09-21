import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
        return;
      }

      const loginResponse = await response.json();
      console.log("Login successful:", loginResponse);

      // Extract accessToken and user name from login response
      const { accessToken, name } = loginResponse.data;

      // Fetch user profile to get venueManager property
      const profileResponse = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        setErrorMessage(errorData.errors[0].message);
        return;
      }

      const profileData = await profileResponse.json();

      // Combine login data and profile data
      const userData = {
        ...loginResponse.data,
        venueManager: profileData.data.venueManager,
        bio: profileData.data.bio,
        avatar: profileData.data.avatar,
        banner: profileData.data.banner,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
