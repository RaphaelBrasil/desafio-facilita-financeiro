import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Input,
	Button,
	Box,
	TextField,
	Container,
	CssBaseline,
	Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			nome: "",
			email: "",
			telefone: "",
			coordenada_x: "",
			coordenada_y: ""
		}
	});

	const [successMessage, setSuccessMessage] = useState("");

	const cadastrarCliente = (data) => {
		axios
			.post(`${baseURL}/clientes`, data)
			.then((res) => {
				console.log(data);
				setSuccessMessage("Cadastro realizado com sucesso!");
			})
			.catch((error) => {
				console.error(error);
				setSuccessMessage(
					"Erro ao cadastrar cliente. Tente novamente."
				);
			});
	};

	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/clientes");
	};

	const onSubmit = (data) => cadastrarCliente(data);

	const baseURL = "http://localhost:8080";

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 12,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Typography component="h1" variant="h5">
					Cadastro de Clientes
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="nome"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								placeholder="Nome"
								margin="normal"
								required
								fullWidth
								name="Nome"
								label="Nome"
								id="Nome"
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								placeholder="Email"
								margin="normal"
								required
								fullWidth
								name="Email"
								label="Email"
								id="Email"
							/>
						)}
					/>
					<Controller
						name="telefone"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								placeholder="Telefone"
								margin="normal"
								required
								fullWidth
								type="number"
								name="Telefone"
								label="Telefone"
								id="Telefone"
							/>
						)}
					/>
					<Box
						sx={{
							marginTop: 2,
							display: "flex",
							alignItems: "center"
						}}
					>
						<Controller
							name="coordenada_x"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="number"
									placeholder="Coordenada X"
								/>
							)}
						/>
						<Controller
							name="coordenada_y"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="number"
									placeholder="Coordenada Y"
								/>
							)}
						/>
					</Box>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Enviar
					</Button>
				</form>

				<Button
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={handleClick}
				>
					Ir para Clientes
				</Button>
				{successMessage && (
					<Typography
						variant="body1"
						color="primary"
						sx={{ mt: 2, mb: 1 }}
					>
						{successMessage}
					</Typography>
				)}
			</Box>
		</Container>
	);
};

export default Form;
