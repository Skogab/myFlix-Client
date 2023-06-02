import { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({ movies, favoriteMovies }) => {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      favoriteMovies.includes(movie._id)
    );
    setFavMovies(filteredMovies);
  }, [movies, favoriteMovies]);

  return (
    <>
      <h4>Favorite movies:</h4>
      {favMovies.length === 0 ? (
        <span>No movies selected</span>
      ) : (
        favMovies.map((movie) => (
          <Col className="mb-4" key={movie._id} xs={12} md={6} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))
      )}
    </>
  );
};
