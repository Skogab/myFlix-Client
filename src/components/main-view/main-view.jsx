import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Button, Container, Row } from "react-bootstrap";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!token) {
			return;
		}

		setLoading(true);
		fetch("https://movieappskogaby.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				console.log("data", data);
				const moviesFromApi = data.map((movie) => {
					return {
						id: movie._id,
						title: movie.Title,
						image: movie.ImagePath,
						description: movie.Description,
						genre: movie.Genre.Name,
						director: movie.Director.Name,
					};
				});
				setMovies(moviesFromApi);
			});
	}, [token]);

	if (!user) {
		return (
			<>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>
				or
				<SignupView />
			</>
		);
	}

	if (selectedMovie) {
		return (
			<>
				<Button
					onClick={() => {
						setUser(null);
						setToken(null);
						localStorage.clear();
					}}>
					Logout
				</Button>
				<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
			</>
		);
	}

	if (movies.length === 0) {
		return (
			<>
				<Button
					onClick={() => {
						setUser(null);
						setToken(null);
						localStorage.clear();
					}}>
					Logout
				</Button>
				<div>The list is empty!</div>
			</>
		);
	}

	return (
		<Container>
			<Row>
				<Col>
					<Button
						onClick={() => {
							setUser(null);
							setToken(null);
							localStorage.clear();
						}}>
						Logout
					</Button>
				</Col>
			</Row>
			<Row>
				{movies.map((movie) => (
					<Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
						<MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
					</Col>
				))}
			</Row>
		</Container>
	);
};
