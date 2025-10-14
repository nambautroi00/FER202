import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MovieCard from "../components/Movie/MovieCard";

class FavouritesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: []
    };
  }

  componentDidMount() {
    // Load favourites from localStorage
    const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.setState({ favourites: stored });
  }

  clearFavourites = () => {
    if (window.confirm("Are you sure you want to clear all favourites?")) {
      localStorage.removeItem('favourites');
      this.setState({ favourites: [] });
    }
  };

  render() {
    const { favourites } = this.state;

    return (
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-heart-fill text-danger me-2"></i>
            My Favourites
          </h2>
          {favourites.length > 0 && (
            <Button variant="outline-danger" onClick={this.clearFavourites}>
              <i className="bi bi-trash me-2"></i>
              Clear All
            </Button>
          )}
        </div>

        {favourites.length === 0 ? (
          <div className="text-center mt-5">
            <i className="bi bi-heart" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            <h4 className="text-muted mt-3">No favourites yet</h4>
            <p>Start adding movies to your favourites collection!</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {favourites.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }
}

export default FavouritesPage;

