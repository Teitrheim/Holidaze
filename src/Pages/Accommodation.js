import React, { useState, useEffect } from "react";

function Accommodation() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
              "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Accommodation</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            {venue.media.length > 0 && (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accommodation;
