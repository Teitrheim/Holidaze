import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateVenue.css";

function CreateVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [{ url: "" }],
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox inputs
    if (type === "checkbox") {
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleMediaChange = (e) => {
    const { value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      media: [{ url: value }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !venueData.name ||
      !venueData.description ||
      !venueData.price ||
      !venueData.maxGuests
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify({
            ...venueData,
            price: parseFloat(venueData.price),
            maxGuests: parseInt(venueData.maxGuests),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0].message}`);
        return;
      }

      alert("Venue created successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("An error occurred while creating the venue.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Create a New Venue</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="card mb-4">
          <div className="card-header">Venue Details</div>
          <div className="card-body">
            <div className="row mb-3 align-items-center">
              <label htmlFor="name" className="visually-hidden">
                Name:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control ${
                    touched.name && !venueData.name ? "is-invalid" : ""
                  }`}
                  value={venueData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter the venue name"
                />
                {touched.name && !venueData.name && (
                  <div className="invalid-feedback">
                    Please enter the venue name.
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="description" className="visually-hidden">
                Description:
              </label>
              <div className="col-sm-9">
                <textarea
                  name="description"
                  id="description"
                  className={`form-control ${
                    touched.description && !venueData.description
                      ? "is-invalid"
                      : ""
                  }`}
                  value={venueData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  required
                  placeholder="Enter a description"
                />
                {touched.description && !venueData.description && (
                  <div className="invalid-feedback">
                    Please enter a description.
                  </div>
                )}
              </div>
            </div>

            {/* Price and Max Guests */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="price" className="visually-hidden">
                Price per Night:
              </label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className={`form-control ${
                    touched.price && !venueData.price ? "is-invalid" : ""
                  }`}
                  value={venueData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="e.g., 100"
                />
                {touched.price && !venueData.price && (
                  <div className="invalid-feedback">
                    Please enter the price per night.
                  </div>
                )}
              </div>
              {/* Max Guests */}
              <label htmlFor="maxGuests" className="visually-hidden">
                Max Guests:
              </label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  className={`form-control ${
                    touched.maxGuests && !venueData.maxGuests
                      ? "is-invalid"
                      : ""
                  }`}
                  value={venueData.maxGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="e.g., 4"
                />
                {touched.maxGuests && !venueData.maxGuests && (
                  <div className="invalid-feedback">
                    Please enter the maximum number of guests.
                  </div>
                )}
              </div>
            </div>

            {/* Media URL */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="mediaUrl" className="visually-hidden">
                Image URL:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="url"
                  id="mediaUrl"
                  className="form-control"
                  value={venueData.media[0].url}
                  onChange={handleMediaChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Image Preview */}
            {venueData.media[0].url && (
              <div className="text-center mb-3">
                <img
                  src={venueData.media[0].url}
                  alt="Venue Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="card mb-4">
          <div className="card-header">Amenities</div>
          <div className="card-body">
            <div className="row">
              {/* Wi-Fi */}
              <div className="col-md-3 mb-3">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    className="form-check-input"
                    checked={venueData.meta.wifi}
                    onChange={handleChange}
                  />
                  <label htmlFor="wifi" className="form-check-label">
                    Wi-Fi
                  </label>
                </div>
              </div>
              {/* Parking */}
              <div className="col-md-3 mb-3">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="parking"
                    id="parking"
                    className="form-check-input"
                    checked={venueData.meta.parking}
                    onChange={handleChange}
                  />
                  <label htmlFor="parking" className="form-check-label">
                    Parking
                  </label>
                </div>
              </div>
              {/* Breakfast */}
              <div className="col-md-3 mb-3">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    className="form-check-input"
                    checked={venueData.meta.breakfast}
                    onChange={handleChange}
                  />
                  <label htmlFor="breakfast" className="form-check-label">
                    Breakfast
                  </label>
                </div>
              </div>
              {/* Pets */}
              <div className="col-md-3 mb-3">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="pets"
                    id="pets"
                    className="form-check-input"
                    checked={venueData.meta.pets}
                    onChange={handleChange}
                  />
                  <label htmlFor="pets" className="form-check-label">
                    Pets Allowed
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateVenue;
