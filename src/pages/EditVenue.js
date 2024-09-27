import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditVenue.css";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }

        const data = await response.json();
        setVenueData(data.data);
        setLoading(false);

        // Access Control: Ensure only the owner can edit
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.name !== data.data.owner.name) {
          alert("You are not authorized to edit this venue.");
          navigate("/dashboard");
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in venueData.meta) {
      // Handle meta checkbox changes
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else if (name === "url" || name === "alt") {
      // Handle media changes
      setVenueData((prevData) => ({
        ...prevData,
        media: [{ ...prevData.media[0], [name]: value }],
      }));
    } else {
      // Handle other input changes
      setVenueData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? parseInt(value) : value,
      }));
    }
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
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify(venueData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0].message}`);
        return;
      }

      alert("Venue updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("An error occurred while updating the venue.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (confirmDelete) {
      try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.errors[0].message}`);
          return;
        }

        alert("Venue deleted successfully!");
        navigate("/dashboard");
      } catch (error) {
        alert("An error occurred while deleting the venue.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!venueData) return <p>Venue not found.</p>;

  return (
    <div className="container mt-5 edit-venue-container">
      <h1 className="text-center mb-4">Edit Venue</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Venue Details */}
        <div className="card mb-4">
          <div className="card-header">Venue Details</div>
          <div className="card-body">
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="visually-hidden">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${
                  touched.name && !venueData.name ? "is-invalid" : ""
                }`}
                value={venueData.name}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, name: true })}
                required
                placeholder="Enter the venue name"
              />
              {touched.name && !venueData.name && (
                <div className="invalid-feedback">
                  Please enter the venue name.
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="visually-hidden">
                Description<span className="text-danger">*</span>
              </label>
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
                onBlur={() => setTouched({ ...touched, description: true })}
                required
                rows="4"
                placeholder="Enter a description"
              />
              {touched.description && !venueData.description && (
                <div className="invalid-feedback">
                  Please enter a description.
                </div>
              )}
            </div>

            {/* Price and Max Guests */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="visually-hidden">
                  Price per Night<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={`form-control ${
                    touched.price && !venueData.price ? "is-invalid" : ""
                  }`}
                  value={venueData.price}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, price: true })}
                  required
                  placeholder="e.g., 100"
                />
                {touched.price && !venueData.price && (
                  <div className="invalid-feedback">
                    Please enter the price per night.
                  </div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maxGuests" className="visually-hidden">
                  Maximum Guests<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  className={`form-control ${
                    touched.maxGuests && !venueData.maxGuests
                      ? "is-invalid"
                      : ""
                  }`}
                  value={venueData.maxGuests}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, maxGuests: true })}
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
          </div>
        </div>

        {/* Media */}
        <div className="card mb-4">
          <div className="card-header">Media</div>
          <div className="card-body">
            {/* Image URL */}
            <div className="mb-3">
              <label htmlFor="mediaUrl" className="visually-hidden">
                Image URL
              </label>
              <input
                type="text"
                id="mediaUrl"
                name="url"
                className="form-control"
                value={venueData.media[0]?.url || ""}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {/* Image Preview */}
            {venueData.media[0]?.url && (
              <div className="text-center mb-3">
                <img
                  src={venueData.media[0].url}
                  alt={venueData.media[0].alt || "Venue Image"}
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
            {/* Alt Text */}
            <div className="mb-3">
              <label htmlFor="alt" className="visually-hidden">
                Image Alt Text
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                className="form-control"
                value={venueData.media[0]?.alt || ""}
                onChange={handleChange}
                placeholder="Enter image alt text"
              />
            </div>
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

        {/* Submit and Delete Buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Update Venue
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete Venue
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVenue;
