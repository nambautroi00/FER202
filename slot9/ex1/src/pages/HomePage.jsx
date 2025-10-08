import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import { movies } from "../data/movies";
import MovieCard from "../components/Movies/MovieCard";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <Container className="mt-4">
        <h4>Featured Movies Collections</h4>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} className="d-flex">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
