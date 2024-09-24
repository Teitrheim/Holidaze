import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md custom-header">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <img src={logo} alt="Holidaze Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse custom-nav" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/accommodation"
                onClick={() => window.scrollTo(0, 0)}
              >
                Accommodation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
              >
                Contact Us
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {user.avatar && user.avatar.url ? (
                      <img
                        src={user.avatar.url}
                        alt={user.avatar.alt || "User Avatar"}
                        className="header-avatar"
                      />
                    ) : (
                      `Welcome, ${user.name}`
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
