import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the venue data to pre-fill the form
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
        console.error("Error fetching venue:", error);
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
      console.error("Error updating venue:", error);
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
        console.error("Error deleting venue:", error);
        alert("An error occurred while deleting the venue.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!venueData) return <p>Venue not found.</p>;

  return (
    <div className="edit-venue-container">
      <h1>Edit Venue</h1>
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
            value={venueData.media[0]?.url || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Media Alt Text:</label>
          <input
            type="text"
            name="alt"
            value={venueData.media[0]?.alt || ""}
            onChange={handleChange}
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
        <button type="submit">Update Venue</button>
      </form>

      {/* Delete Button */}
      <button onClick={handleDelete} className="delete-button">
        Delete Venue
      </button>
    </div>
  );
}

export default EditVenue;
