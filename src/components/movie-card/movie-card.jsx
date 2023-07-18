import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
	const handleAddToFavorites = () => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		const parsedUser = JSON.parse(storedUser);

		const info = {
			Title: movie.title,
			GenreName: movie.genre,
			DirectorName: movie.director,
			Email: parsedUser.Email,
			Password: parsedUser.Password,
		};

		fetch(`https://movieappskogaby.herokuapp.com/users/${parsedUser.Username}/movies/${movie.id}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${storedToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				alert("Movie added to your favorites list");
			})
			.catch((error) => {
				alert("Error: " + error);
			});
	};

	const handleRemoveFromFavorites = () => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		const parsedUser = JSON.parse(storedUser);

		fetch(`https://movieappskogaby.herokuapp.com/users/${parsedUser.Username}/movies/${movie.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${storedToken}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					alert("Movie removed from your favorites list");
				} else {
					throw new Error("Failed to remove movie from favorites");
				}
			})
			.catch((error) => {
				alert("Error: " + error);
			});
	};

	return (
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
				<Button variant="danger" onClick={handleRemoveFromFavorites}>
					Remove from Favorites
				</Button>
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
		director: PropTypes.string,
	}).isRequired,
};
