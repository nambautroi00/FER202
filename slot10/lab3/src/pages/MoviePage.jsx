import React from "react";
import MovieCard from "../components/Movie/MovieCard.jsx";
import Filter from "../components/Filter/Filter.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { movies } from "../data/movies/movies.js";

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      yearFilter: "all",
      sortBy: ""
    };
  }

  setSearchTerm = (value) => {
    this.setState({ searchTerm: value });
  };

  setYearFilter = (value) => {
    this.setState({ yearFilter: value });
  };

  setSortBy = (value) => {
    this.setState({ sortBy: value });
  };

  getFilteredAndSortedMovies = () => {
    const { searchTerm, yearFilter, sortBy } = this.state;

    // Filter movies based on search and year
    let filteredMovies = movies.filter((movie) => {
      // Search filter
      const matchesSearch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Year filter
      let matchesYear = true;
      if (yearFilter === "<=2000") {
        matchesYear = movie.year <= 2000;
      } else if (yearFilter === "2001-2015") {
        matchesYear = movie.year >= 2001 && movie.year <= 2015;
      } else if (yearFilter === ">2015") {
        matchesYear = movie.year > 2015;
      }

      return matchesSearch && matchesYear;
    });

    // Sort movies
    if (sortBy) {
      filteredMovies = [...filteredMovies].sort((a, b) => {
        switch (sortBy) {
          case "year-asc":
            return a.year - b.year;
          case "year-desc":
            return b.year - a.year;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "duration-asc":
            return a.duration - b.duration;
          case "duration-desc":
            return b.duration - a.duration;
          default:
            return 0;
        }
      });
    }

    return filteredMovies;
  };

  render() {
    const { searchTerm, yearFilter, sortBy } = this.state;
    const filteredMovies = this.getFilteredAndSortedMovies();

    return (
      <Container>
        <h2 className="mb-3 text-center">My Movies Collection</h2>

        <Filter
          searchTerm={searchTerm}
          setSearchTerm={this.setSearchTerm}
          yearFilter={yearFilter}
          setYearFilter={this.setYearFilter}
          sortBy={sortBy}
          setSortBy={this.setSortBy}
        />

        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>

        {filteredMovies.length === 0 && (
          <div className="text-center mt-5">
            <h4 className="text-muted">No movies found</h4>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </Container>
    );
  }
}

export default MoviePage;
