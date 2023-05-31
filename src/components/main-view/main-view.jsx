import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Button, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateForm } from "../profile-view/update-form";

import "./main-view.scss";

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

	const handleLogout = () => {
		setUser(null);
		setToken(null);
		localStorage.clear();
	};

	return (
		<BrowserRouter>
			<NavigationBar user={user} onLoggedOut={handleLogout} />
			<Row className="justify-content-md-center">
				<Routes>
					<Route
						path="/signup"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<LoginView onLoggedIn={(user) => setUser(user)} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/movies/:movieId"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col className="mb-4" key={movie.id} md={3}>
												<MovieCard movie={movie} />
											</Col>
										))}
									</>
								)}
							</>
						}
					/>

					<Route
						path="/profile"
						element={<>{user ? <ProfileView user={user} movies={movies} /> : <Navigate to="/login" replace />}</>}
					/>
					<Route
						path="/profile/update"
						element={<>{user ? <UpdateForm user={user} /> : <Navigate to="/login" replace />}</>}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
