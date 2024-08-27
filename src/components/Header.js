import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/accommodation" onClick={toggleMenu}>
              Accommodation
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
