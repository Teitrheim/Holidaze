import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    const registrationData = {
      name,
      email,
      password,
      bio: bio || undefined,
      avatar: avatarUrl ? { url: avatarUrl, alt: avatarAlt || "" } : undefined,
      banner: bannerUrl ? { url: bannerUrl, alt: bannerAlt || "" } : undefined,
      venueManager: venueManager,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.errors[0].message);
        throw new Error("Failed to register");
      }

      setSuccessMessage(
        "Registration successful! Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {}
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegistration} noValidate>
        <h2>Register</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">
            Name<span className="text-danger">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="text-danger">*</span>:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">
            Password<span className="text-danger">*</span>:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        {/* Bio */}
        <div className="form-group">
          <label htmlFor="bio">Bio (Optional):</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength="160"
            aria-describedby="bioHelp"
          />
          <small id="bioHelp" className="form-text">
            Maximum 160 characters.
          </small>
        </div>

        {/* Avatar URL */}
        <div className="form-group">
          <label htmlFor="avatarUrl">Avatar URL (Optional):</label>
          <input
            type="text"
            id="avatarUrl"
            name="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            aria-describedby="avatarUrlHelp"
          />
          <small id="avatarUrlHelp" className="form-text">
            Provide a URL for your avatar image.
          </small>
        </div>

        {/* Avatar Alt Text */}
        <div className="form-group">
          <label htmlFor="avatarAlt">Avatar Alt (Optional):</label>
          <input
            type="text"
            id="avatarAlt"
            name="avatarAlt"
            value={avatarAlt}
            onChange={(e) => setAvatarAlt(e.target.value)}
            maxLength="120"
            aria-describedby="avatarAltHelp"
          />
          <small id="avatarAltHelp" className="form-text">
            Alternative text for your avatar image.
          </small>
        </div>

        {/* Banner URL */}
        <div className="form-group">
          <label htmlFor="bannerUrl">Banner URL (Optional):</label>
          <input
            type="text"
            id="bannerUrl"
            name="bannerUrl"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            aria-describedby="bannerUrlHelp"
          />
          <small id="bannerUrlHelp" className="form-text">
            Provide a URL for your banner image.
          </small>
        </div>

        {/* Banner Alt Text */}
        <div className="form-group">
          <label htmlFor="bannerAlt">Banner Alt (Optional):</label>
          <input
            type="text"
            id="bannerAlt"
            name="bannerAlt"
            value={bannerAlt}
            onChange={(e) => setBannerAlt(e.target.value)}
            maxLength="120"
            aria-describedby="bannerAltHelp"
          />
          <small id="bannerAltHelp" className="form-text">
            Alternative text for your banner image.
          </small>
        </div>

        {/* Venue Manager Checkbox */}
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="venueManager"
            name="venueManager"
            checked={venueManager}
            onChange={(e) => setVenueManager(e.target.checked)}
            className="form-check-input"
          />
          <label htmlFor="venueManager" className="form-check-label">
            Venue Manager
          </label>
        </div>

        {/* Register Button */}
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
