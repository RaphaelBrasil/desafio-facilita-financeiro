const express = require("express");
const cors = require("cors");
const graphlib = require("graphlib");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const {
	calcularComprimentoTotal,
	calcularDistancia
} = require("./graphModule");

const app = express();
const port = 8080;

// Configuração do cliente PostgreSQL
const client = new Client({
	password: "root",
	user: "root",
	host: "db"
});

app.use(bodyParser.json());
app.use(cors());

// Middleware para garantir que o cliente PostgreSQL esteja conectado
app.use(async (req, res, next) => {
	try {
		if (!client || !client._connected) {
			await client.connect();
		}
		next();
	} catch (error) {
		console.error("Erro ao conectar ao banco de dados:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Rota para listar clientes
app.get("/clientes", async (req, res) => {
	try {
		const result = await client.query("SELECT * FROM clientes");
		res.json(result.rows);
	} catch (error) {
		console.error("Erro ao obter clientes:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Rota para cadastrar um novo cliente
app.post("/clientes", async (req, res) => {
	const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
	try {
		await client.query(
			"INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)",
			[nome, email, telefone, coordenada_x, coordenada_y]
		);
		res.status(201).send("Cliente cadastrado com sucesso");
	} catch (error) {
		console.error("Erro ao cadastrar cliente:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/rota", async (req, res) => {
	try {
		const result = await client.query("SELECT * FROM clientes");
		const clientes = result.rows;

		const grafo = new graphlib.Graph();

		grafo.setNode("0", { x: 0, y: 0 });

		clientes.forEach((cliente) => {
			grafo.setNode(`${cliente.id}`, {
				x: cliente.coordenada_x,
				y: cliente.coordenada_y
			});
		});

		const nodes = grafo.nodes();
		const visitedNodes = new Set();
		const processedNodes = new Set();

		let nodeA = "0";

		while (visitedNodes.size < nodes.length) {
			// Verificar apenas os nós não visitados
			const unvisitedNodes = nodes.filter(
				(node) => !visitedNodes.has(node)
			);

			if (unvisitedNodes.length === 0) {
				break; // Todos os nós foram visitados, encerrar o loop
			}

			let distancias = [];

			unvisitedNodes.forEach((nodeB) => {
				if (nodeA !== nodeB && !processedNodes.has(nodeB)) {
					const distancia = calcularDistancia(
						grafo.node(nodeA),
						grafo.node(nodeB)
					);
					distancias.push({ id: nodeB, distancia });
				}
			});

			// Ordenar distâncias para obter os nós mais próximos
			distancias.sort((a, b) => a.distancia - b.distancia);

			if (distancias[0]) {
				// Conectar ao nó mais próximo
				const nodeB = distancias[0].id;
				grafo.setEdge(nodeA, nodeB, {
					label: [nodeA, nodeB]
				});

				visitedNodes.add(nodeA);
				processedNodes.add(nodeB);

				nodeA = nodeB;
			} else {
				// Se não houver nós alcançáveis, encerrar o loop
				break;
			}
		}

		const edges = grafo.edges();
		const rotaSet = new Set(
			edges.map((edge) => {
				const sortedLabel = grafo.edge(edge).label.sort();
				return JSON.stringify(sortedLabel);
			})
		);

		const sortedRota = Array.from(rotaSet).map((edge) => JSON.parse(edge));

		let ultimoNode = -1;
		const rota = sortedRota.map((node) => {
			// Comparar o último elemento do vetor anterior com o primeiro elemento do vetor atual
			if (node[1] === ultimoNode) {
				ultimoNode = node[1];
				return [node[1], node[0]];
			} else {
				ultimoNode = node[1];
				return node;
			}
		});

		// Calcular o comprimento total da rota
		const distanciaTotal = calcularComprimentoTotal(grafo, rota);

		res.json({ nodes, rota, distanciaTotal, clientes });
	} catch (error) {
		console.error("Erro ao calcular rota:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
