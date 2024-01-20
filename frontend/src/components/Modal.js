import {
	Modal,
	Box,
	Typography,
	Button,
	Card,
	CardContent
} from "@mui/material";

const RouteModal = ({ isOpen, onClose, rota, distanciaTotal }) => {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					marginTop: 12
				}}
			>
				<Card
					variant="outlined"
					sx={{
						mt: 2,
						boxShadow: 1,
						bgcolor: "white",
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start"
						}}
					>
						<Typography variant="h6" component="div">
							Ordem da Rota
						</Typography>
						{rota.map((id, index) => (
							<Typography
								key={id}
								variant="body2"
								color="text.secondary"
							>
								Caminho a seguir {index + 1}:{" "}
								{id[0] + " -> " + id[1]}
							</Typography>
						))}
						{
							<Typography variant="h6" component="div">
								{`Distância Total: ${distanciaTotal}`}
							</Typography>
						}
					</CardContent>
					<Button
						onClick={onClose}
						variant="contained"
						color="primary"
						sx={{
							marginBottom: 2
						}}
					>
						Fechar
					</Button>
				</Card>
			</Box>
		</Modal>
	);
};

export default RouteModal;
