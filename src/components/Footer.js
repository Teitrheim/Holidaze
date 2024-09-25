import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../images/logo.png";

function Footer() {
  return (
    <footer className="custom-footer mt-auto py-3">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <img src={logo} alt="Holidaze Logo" className="footer-logo" />
          </div>

          {/* Links */}
          <div className="col-md-4 text-center mb-2 mb-md-0">
            <ul className="list-inline mb-0 footer-links">
              <li className="list-inline-item">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0 footer-text">© 2023 Holidaze Travels</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
