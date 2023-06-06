import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({ movies, userFavoriteMovies, addToFavorites, removeFromFavorites }) => {
	const [favMovies, setFavMovies] = useState([]);

	useEffect(() => {
		const filteredMovies = movies.filter((movie) => userFavoriteMovies.includes(movie._id));
		setFavMovies(filteredMovies);
	}, [movies, userFavoriteMovies]);

	const handleAddToFavorites = (movieId) => {
		addToFavorites(movieId);
	};

	const handleRemoveFromFavorites = (movieId) => {
		removeFromFavorites(movieId);
	};

	return (
		<>
			<h4>Favorite movies:</h4>
			{favMovies.length === 0 ? (
				<span>No movies selected</span>
			) : (
				favMovies.map((movie) => (
					<Col className="mb-4" key={movie._id} xs={12} md={6} lg={3}>
						<MovieCard
							movie={movie}
							onAddToFavorites={() => handleAddToFavorites(movie._id)}
							onRemoveFromFavorites={() => handleRemoveFromFavorites(movie._id)}
						/>
					</Col>
				))
			)}
		</>
	);
};
