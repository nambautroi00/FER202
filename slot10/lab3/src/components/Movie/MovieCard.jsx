import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./MovieCard.css";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showToast: false
    };
  }

  handleAddToFavourites = () => {
    const { movie } = this.props;
    // Lưu vào localStorage
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (!favourites.find(m => m.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      this.setState({ showToast: true });
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  handleHideToast = () => {
    this.setState({ showToast: false });
  };

  render() {
    const { movie } = this.props;
    const { showModal, showToast } = this.state;

    return (
      <>
        <Card className="movie-card h-100">
          <Card.Img 
            variant="top" 
            src={movie.poster} 
            alt={movie.title}
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text className="text-muted">
              {movie.description.substring(0, 80)}...
            </Card.Text>
            <div className="mb-2">
              <Badge bg="info" className="me-2">{movie.genre}</Badge>
              <Badge bg="secondary">{movie.year}</Badge>
            </div>
            <div className="mb-2 text-muted small">
              <div><strong>Country:</strong> {movie.country}</div>
              <div><strong>Duration:</strong> {movie.duration} min</div>
            </div>
            <div className="mt-auto d-flex justify-content-between gap-2">
              <Button 
                variant="primary" 
                size="sm"
                onClick={this.handleShowModal}
              >
                View Details
              </Button>
              <Button 
                variant="outline-warning" 
                size="sm"
                onClick={this.handleAddToFavourites}
              >
                Add to Favourite
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Modal for movie details */}
        <Modal show={showModal} onHide={this.handleHideModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{movie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="img-fluid mb-3"
              style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
            />
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Genre:</strong> <Badge bg="info">{movie.genre}</Badge></p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Country:</strong> {movie.country}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toast notification */}
        <ToastContainer position="top-end" className="p-3">
          <Toast 
            show={showToast} 
            onClose={this.handleHideToast} 
            delay={3000} 
            autohide
            bg="success"
          >
            <Toast.Header>
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Added to favourites!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }
}

export default MovieCard;

