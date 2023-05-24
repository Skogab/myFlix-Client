import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
		};

		fetch("https://movieappskogaby.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Login response:", data);
				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					localStorage.setItem("token", data.token);
					onLoggedIn(data.user, data.token);
				} else {
					alert("No such user");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("An error occurred during login. Please try again later.");
			});
	};

	return (
		<Card className="mt-2 mb-3 bg-success">
			<Card.Body>
				<Card.Title className="text-light">Log in</Card.Title>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label className="text-light">Username:</Form.Label>
						<Form.Control
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							minLength="5"
							className="bg-success text-light"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="text-light">Password:</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="bg-success text-light"
						/>
					</Form.Group>
					<Button className="mt-3" variant="light" type="submit">
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};
