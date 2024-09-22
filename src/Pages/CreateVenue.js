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
    <div className="create-venue-container">
      <h1>Create a New Venue</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name*:</label>
          <input
            type="text"
            name="name"
            value={venueData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description*:</label>
          <textarea
            name="description"
            value={venueData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price per Night*:</label>
          <input
            type="number"
            name="price"
            value={venueData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Maximum Guests*:</label>
          <input
            type="number"
            name="maxGuests"
            value={venueData.maxGuests}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Media URL:</label>
          <input
            type="text"
            name="url"
            value={venueData.media[0].url}
            onChange={handleMediaChange}
          />
        </div>
        <div>
          <label>Media Alt Text:</label>
          <input
            type="text"
            name="alt"
            value={venueData.media[0].alt}
            onChange={handleMediaChange}
          />
        </div>
        <div>
          <h3>Amenities:</h3>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleChange}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleChange}
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleChange}
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleChange}
            />
            Pets Allowed
          </label>
        </div>

        <button type="submit">Create Venue</button>
      </form>
    </div>
  );
}

export default CreateVenue;
