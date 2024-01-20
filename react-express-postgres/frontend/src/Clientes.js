import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	Button,
	Card,
	CardContent,
	TextField
} from "@mui/material";
import RouteModal from "./components/Modal";

function Clientes() {
	const [status, setStatus] = useState("carregando");
	const [clients, setClients] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [rota, setRota] = useState([]);
	const [distanciaTotal, setDistanciaTotal] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const baseURL = "http://localhost:8080";

	useEffect(() => {
		axios
			.get(`${baseURL}/clientes`)
			.then((res) => {
				setClients(res.data);
				setStatus(res.status);
				console.log(res);
			})
			.catch(console.error);
	}, []);

	const handleCalculateRoute = () => {
		axios
			.get(`${baseURL}/rota`)
			.then((res) => {
				setRota(res.data.rota);
				setDistanciaTotal(res.data.distanciaTotal);
				setIsModalOpen(true);
				console.log(res.data);
			})
			.catch(console.error);
	};

	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};

	// Função para filtrar os clientes com base no termo de busca
	const filteredClients = clients.filter((client) =>
		client.nome.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Container>
			<Typography
				variant="h4"
				color="text.primary"
				display="flex"
				justifyContent="center"
			>
				Lista de Clientes
			</Typography>
			<Box mt={3} display="flex" justifyContent="space-between">
				<TextField
					label="Buscar por nome"
					variant="outlined"
					value={searchTerm}
					sx={{ boxShadow: 1 }}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCalculateRoute}
				>
					Calcular Rota
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClick}
				>
					Ir para Cadastro
				</Button>
			</Box>
			<Box
				mt={3}
				display="flex"
				flexWrap="wrap"
				justifyContent="start"
				gap={2}
			>
				{filteredClients.map((client) => (
					<Card
						key={client.id}
						variant="outlined"
						sx={{
							mt: 2,
							width: "30%",
							boxShadow: 1,
							bgcolor: "white",
							"&:hover": {
								bgcolor: "silver"
							}
						}}
					>
						<CardContent>
							<Typography variant="h6" component="div">
								{client.nome}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								ID: {client.id}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Email: {client.email}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Telefone: {client.telefone}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>

			<Typography
				variant="body1"
				mt={2}
				color="text.secondary"
				display="flex"
				justifyContent="center"
			>
				{status === "carregando" ? "Carregando" : ""}
			</Typography>
			<RouteModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				rota={rota}
				distanciaTotal={distanciaTotal}
			/>
		</Container>
	);
}

export default Clientes;
