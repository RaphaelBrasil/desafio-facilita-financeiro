import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Clientes from "./Clientes";
import Form from "./Form";
import "./index.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Form />} />
				<Route path="/clientes" element={<Clientes />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	);
};

function NoMatch() {
	return (
		<div>
			<h2>Nada pra ver aqui!</h2>
			<p>
				<Link to="/">Voltar a página principal</Link>
			</p>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
