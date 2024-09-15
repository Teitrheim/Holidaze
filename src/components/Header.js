import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Holidaze Logo" style={{ height: "50px" }} />
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
              <li>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  {user.avatar ? (
                    <img
                      src={user.avatar.url}
                      alt={user.avatar.alt}
                      className="header-avatar"
                    />
                  ) : (
                    `Welcome, ${user.name}`
                  )}
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
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
