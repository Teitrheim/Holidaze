import React from "react";
import "./SignupSection.css";
import logo from "../images/logo.png";

function SignupSection() {
  return (
    <section className="signup-section">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="signup-info d-flex align-items-center">
          <img src={logo} alt="Holidaze Logo" className="signup-logo" />
          <div>
            <h3>Join the Holidaze Community</h3>
            <p>Sign up to receive exclusive offers and travel updates</p>
          </div>
        </div>
        <button className="btn btn-success">Sign Up Now</button>
      </div>
    </section>
  );
}

export default SignupSection;
