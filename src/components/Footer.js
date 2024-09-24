import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../images/logo.png";

function Footer() {
  return (
    <footer className="custom-footer mt-auto py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <img src={logo} alt="Holidaze Logo" className="footer-logo" />
          </div>

          {/* Links */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <ul className="list-inline mb-0 footer-links">
              <li className="list-inline-item mx-2">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0">© 2023 Holidaze Travels</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
