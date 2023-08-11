import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, addToFavorites, removeFromFavorites }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getUser();
	}, []);

	const getUser = () => {
		const token = localStorage.getItem("token");
		fetch(`https://movieappskogaby.herokuapp.com/profiles/${user.Username}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((response) => {
				setUsername(response.Username);
				setPassword(response.Password);
				setEmail(response.Email);
				setBirthday(response.Birthday);

				const userFavoriteMovieIds = response.FavoriteMovies.map((movie) => movie._id);
				setUserFavoriteMovies(userFavoriteMovieIds);
			})
			.catch((error) => {
				console.log("Error fetching user data:", error);
			});
	};

	const handleBack = () => {
		navigate("/");
	};

	const handleAddToFavorites = (movieId) => {
		addToFavorites(movieId);
	};

	const handleRemoveFromFavorites = (movieId) => {
		removeFromFavorites(movieId);
	};

	return (
		<Container>
			<Row className="mb-4">
				<Col>
					<Button onClick={handleBack}>Back</Button>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<div>
								<h4>User Details</h4>
								<p>Username: {username}</p>
								<p>Birthday: {birthday}</p>
								<p>Email: {email}</p>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<UpdateForm user={user} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<FavMovies
								movies={movies}
								userFavoriteMovies={userFavoriteMovies}
								addToFavorites={handleAddToFavorites}
								removeFromFavorites={handleRemoveFromFavorites}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
