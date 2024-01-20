function calcularDistancia(pontoA, pontoB) {
	if (
		!pontoA ||
		typeof pontoA.x === "undefined" ||
		typeof pontoA.y === "undefined" ||
		!pontoB ||
		typeof pontoB.x === "undefined" ||
		typeof pontoB.y === "undefined"
	) {
		throw new Error("Ponto inválido fornecido para calcularDistancia");
	}

	const dx = pontoA.x - pontoB.x;
	const dy = pontoA.y - pontoB.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function calcularComprimentoTotal(grafo, rota) {
	let distanciaTotal = 0;

	for (let i = 0; i < rota.length; i++) {
		const [nodeA, nodeB] = rota[i];

		// Verifique se a aresta existe no grafo
		if (grafo.hasEdge(nodeA, nodeB)) {
			const aresta = grafo.edge(nodeA, nodeB);

			// Adicione a distância da aresta à distância total
			distanciaTotal += calcularDistancia(
				grafo.node(nodeA),
				grafo.node(nodeB)
			);
		}
	}

	// Adicionando a distância do último nó de volta à origem
	const ultimaRota = rota[rota.length - 1];
	const ultimoNo =
		ultimaRota[0] > ultimaRota[1] ? ultimaRota[0] : ultimaRota[1];
	const origem = "0";

	distanciaTotal += calcularDistancia(
		grafo.node(ultimoNo),
		grafo.node(origem)
	);

	distanciaTotal = parseFloat(distanciaTotal.toFixed(2));

	return distanciaTotal;
}

module.exports = { calcularDistancia, calcularComprimentoTotal };
