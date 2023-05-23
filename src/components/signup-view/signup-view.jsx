import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch("https://movieappskogaby.herokuapp.com/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					alert("Signup successful");
					window.location.reload();
				} else {
					alert("Signup failed");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("An error occurred during signup. Please try again later.");
			});
	};

	return (
		<Card className="mt-2 mb-3 bg-primary text-light">
			<Card.Body>
				<Card.Title>Sign up</Card.Title>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username:</Form.Label>
						<Form.Control
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							minLength="5"
							className="bg-primary text-light"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength="8"
							className="bg-primary text-light"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="bg-primary text-light"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Birthdate:</Form.Label>
						<Form.Control
							type="date"
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
							required
							className="bg-primary text-light"
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
