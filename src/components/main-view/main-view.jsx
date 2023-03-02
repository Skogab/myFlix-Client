import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Zero Dark Thirty",
      image: "https://via.placeholder.com/600x800?text=Zero+Dark+Thirty",
      director: "Kathrn Bigelow",
    },
    {
      id: 2,
      title: "Dune",
      image: "https://via.placeholder.com/600x800/f7a46c/0a0606?text=Dune",
      director: "Denis Villeneuve",
    },
    {
      id: 3,
      title: "The tree of life",
      image:
        "https://via.placeholder.com/600x800/65852e/ffffff?text=The+Tree+of+Life",
      author: "Terence Mallick",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
