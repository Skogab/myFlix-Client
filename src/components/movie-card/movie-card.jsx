import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, onAddToFavorites }) => {
	const handleAddToFavorites = () => {
		onAddToFavorites(movie.id);
	};

	return (
		<>
			<img src="https://m.media-amazon.com/images/I/51J5V86vqiL._SY445_.jpg"></img>
			<Card>
				<Card.Img variant="top" src={movie.image} />
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					<Card.Text>{movie.director}</Card.Text>
					<Card.Text>{movie.description}</Card.Text>
					<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
						<Button variant="link">Open</Button>
					</Link>
					<Button variant="primary" onClick={handleAddToFavorites}>
						Add to Favorites
					</Button>
				</Card.Body>
			</Card>
		</>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
		director: PropTypes.string,
	}).isRequired,
	onAddToFavorites: PropTypes.func.isRequired,
};
