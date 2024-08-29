import React, { useState, useEffect } from "react";
import "./Accommodation.css";
import { Card, Row, Col, Container, Button, Form } from "react-bootstrap";

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
    <Container className="accommodation-page">
      <h1>Accommodation</h1>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <Form.Select>
          <option>Categories</option>
        </Form.Select>
        <Form.Control type="text" placeholder="Find by name..." />
        <Form.Select>
          <option>Services</option>
        </Form.Select>
        <Button>Search</Button>
      </div>

      {/* Venues List */}
      <Row className="venues-list">
        {venues.map((venue) => (
          <Col xs={12} md={6} lg={4} key={venue.id} className="mb-4">
            <Card className="venue-card">
              {venue.media.length > 0 && (
                <Card.Img
                  variant="top"
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                  className="venue-image"
                />
              )}
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Accommodation;
