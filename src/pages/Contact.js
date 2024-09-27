import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postcode: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setFormData({
        name: "",
        address: "",
        city: "",
        postcode: "",
        email: "",
        message: "",
      });
      alert("Thank you for contacting us!");
      navigate("/");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container contact-container">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="visually-hidden">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <label htmlFor="address" className="visually-hidden">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        {/* City Field */}
        <div className="mb-3">
          <label htmlFor="city" className="visually-hidden">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>

        {/* Postcode Field */}
        <div className="mb-3">
          <label htmlFor="postcode" className="visually-hidden">
            Postcode:
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            className={`form-control ${errors.postcode ? "is-invalid" : ""}`}
            value={formData.postcode}
            onChange={handleChange}
            placeholder="Enter your postcode"
          />
          {errors.postcode && (
            <div className="invalid-feedback">{errors.postcode}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="visually-hidden">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-3">
          <label htmlFor="message" className="visually-hidden">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
