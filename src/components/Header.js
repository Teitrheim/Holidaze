import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo.png";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Holidaze Logo" style={{ height: "50px" }} />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? "open" : ""}`}></div>
      </div>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/accommodation" onClick={() => setIsOpen(false)}>
              Accommodation
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
          {user ? (
            <>
              <li className="user-info">
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  {user.avatar && user.avatar.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.avatar.alt || "User Avatar"}
                      className="header-avatar"
                    />
                  ) : (
                    <span>Welcome, {user.name}</span>
                  )}
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
