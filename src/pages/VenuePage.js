import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./VenuePage.css";
import Carousel from "react-bootstrap/Carousel";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState([]);

  // Fetch the venue details
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
          {
            headers: {
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }

        const data = await response.json();
        setVenue(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setError("Failed to load venue details.");
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Fetch the bookings to check availability
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`,
          {
            headers: {
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch availability");
        }

        const data = await response.json();
        setAvailability(
          data.data.bookings.map((booking) => ({
            from: new Date(booking.dateFrom),
            to: new Date(booking.dateTo),
          }))
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [id]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    if (!user) {
      alert("You must be logged in to make a booking.");
      navigate("/login");
      return;
    }

    const bookingData = {
      dateFrom,
      dateTo,
      guests: parseInt(guests),
      venueId: id,
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message);
      }

      setBookingSuccess("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingError("Failed to create booking. Please try again.");
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a review.");
      navigate("/login");
      return;
    }

    const reviewData = {
      rating,
      comment: reviewText,
      venueId: id,
    };

    try {
      // Storing reviews in localStorage for now
      const storedReviews =
        JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
      const updatedReviews = [...storedReviews, reviewData];
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
      setReviews(updatedReviews);

      // Reset the form after submission
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Render the image carousel
  const renderCarousel = () => {
    if (!venue || !venue.media || venue.media.length === 0) return null;
    return (
      <Carousel>
        {venue.media.map((mediaItem, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={mediaItem.url}
              alt={mediaItem.alt || `Image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  // Check if the selected date range is available
  const isDateAvailable = (date) => {
    return availability.every(
      (booking) => date < booking.from || date > booking.to
    );
  };

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="venue-page">
      <div className="venue-card">
        {venue && venue.media && venue.media.length > 0 ? (
          <div className="venue-carousel">{renderCarousel()}</div>
        ) : (
          <p>No images available</p>
        )}

        <h1>{venue?.name}</h1>
        <p>{venue?.description}</p>

        <div className="venue-details">
          <span>Price per night: ${venue?.price}</span>
          <span>Maximum Guests: {venue?.maxGuests}</span>
          <span>Rating: {venue?.rating || "No rating yet"}</span>
        </div>

        {/* Booking Form */}
        {user ? (
          <div className="booking-form">
            <h2>Book This Venue</h2>
            <form onSubmit={handleBooking}>
              <div>
                <label htmlFor="dateFrom">Start Date:</label>
                <input
                  type="date"
                  id="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="dateTo">End Date:</label>
                <input
                  type="date"
                  id="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="guests">Number of Guests:</label>
                <input
                  type="number"
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  max={venue?.maxGuests}
                  required
                />
              </div>
              <button type="submit">Book Now</button>
            </form>

            {/* Success or error messages */}
            {bookingSuccess && (
              <p className="success-message">{bookingSuccess}</p>
            )}
            {bookingError && <p className="error-message">{bookingError}</p>}
          </div>
        ) : (
          <div className="booking-prompt">
            <p>You must be logged in to book this venue.</p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Log In
            </button>
          </div>
        )}

        {/* Calendar for selecting availability */}
        <div className="venue-calendar">
          <h2>Check Available Dates</h2>
          <Calendar
            selectRange={true}
            tileDisabled={({ date }) => !isDateAvailable(date)}
            onChange={setSelectedDates}
            value={selectedDates}
          />
          <p>
            Selected Dates: {selectedDates[0].toLocaleDateString()} to{" "}
            {selectedDates[1].toLocaleDateString()}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="venue-reviews">
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>Rating:</strong> {review.rating} / 5
                </p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          {user ? (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h3>Leave a Review</h3>
              <div>
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div>
                <label htmlFor="reviewText">Your Review:</label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit Review</button>
            </form>
          ) : (
            <div className="review-prompt">
              <p>You must be logged in to leave a review.</p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VenuePage;
