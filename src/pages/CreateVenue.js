import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [{ url: "", alt: "" }],
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

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

  const handleMediaChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      media: [{ ...prevData.media[0], [name]: value }],
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
      console.error("Error creating venue:", error);
      alert("An error occurred while creating the venue.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create a New Venue</h1>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">Venue Details</div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={venueData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description<span className="text-danger">*</span>:
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={venueData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">
                  Price per Night<span className="text-danger">*</span>:
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  value={venueData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="maxGuests" className="form-label">
                  Maximum Guests<span className="text-danger">*</span>:
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  className="form-control"
                  value={venueData.maxGuests}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="mediaUrl" className="form-label">
                Media URL:
              </label>
              <input
                type="text"
                name="url"
                id="mediaUrl"
                className="form-control"
                value={venueData.media[0].url}
                onChange={handleMediaChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mediaAlt" className="form-label">
                Media Alt Text:
              </label>
              <input
                type="text"
                name="alt"
                id="mediaAlt"
                className="form-control"
                value={venueData.media[0].alt}
                onChange={handleMediaChange}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="card mb-4">
          <div className="card-header">Amenities</div>
          <div className="card-body">
            <div className="form-check mb-2">
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

            <div className="form-check mb-2">
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

            <div className="form-check mb-2">
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

            <div className="form-check mb-2">
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

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateVenue;
