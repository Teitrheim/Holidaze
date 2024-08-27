import React from "react";
import "./Footer.css";
import logo from "../images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="container d-flex justify-content-between align-items-center">
        <img src={logo} alt="Holidaze Logo" className="footer-logo" />
        <ul className="footer-links d-flex">
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms & Conditions</a>
          </li>
        </ul>
        <p>© 2023 Holidaze Travels</p>
      </div>
    </footer>
  );
}

export default Footer;
