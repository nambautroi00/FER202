import React, { useState } from "react";
import { Card, Button, Badge, Row, Col, Toast, Modal } from "react-bootstrap";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddFavourite = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (!favourites.find((m) => m.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <Card className="mb-4 shadow-sm h-100" style={{ minHeight: 420 }}>
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          style={{ height: 220, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            {movie.title}{" "}
            <Badge bg="info" className="text-dark">
              {movie.genre}
            </Badge>
          </Card.Title>
          <Card.Text>{truncate(movie.description, 80)}</Card.Text>
          <div className="mb-2">
            <Badge bg="secondary">{movie.year}</Badge>{" "}
            <Badge bg="success">{movie.country}</Badge>{" "}
            <Badge bg="warning" text="dark">
              {movie.duration} phút
            </Badge>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddFavourite}
            className="me-2"
          >
            Add to Favourites
          </Button>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setShowModal(true)}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20, minWidth: 200 }}
      >
        <Toast.Body>Added to favourites!</Toast.Body>
      </Toast>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={movie.poster}
            alt={movie.title}
            style={{ width: "100%", marginBottom: 12 }}
          />
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Country:</strong> {movie.country}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration} phút
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Showtimes:</strong> {movie.showtimes.join(", ")}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
