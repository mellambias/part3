const Express = require("express");
const app = Express();

const PORT = 3001;

let data = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.use(Express.json());

//3.1 Devuelve toda la información
app.get("/api/persons", (req, res) => {
	res.json(data);
});

//3.2 La página informativa
app.get("/info", (req, res) => {
	const date = new Date();
	res.send(`<p>Phonebook has info for ${data.length} people</p><p>${date}</p>`);
});

// 3.3 mostrar la información de una sola entrada
app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	const person = data.find((person) => person.id === Number(id));
	if (person) {
		res.json(person);
	} else {
		res.statusMessage = `Person with id ${id} not found`;
		res.status(404).end();
	}
});

// 3.4  eliminar una sola entrada de la agenda telefónica
app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = data.find((person) => person.id === id);
	if (person) {
		data = data.filter((person) => person.id === id);
		res.statusMessage = `Person with id ${id} It has been eliminated`;
		res.status(204).end();
	} else {
		res.statusMessage = `Person with id ${id} not found`;
		res.status(404).end();
	}
});

// 3.5 crear una nueva entrada en la agenda telefónica
// 3.6 manejo de errores para crear nuevas entradas.
app.post("/api/persons", (req, res) => {
	const body = req.body;
	if (!body.name || !body.number) {
		return res.status(400).json({
			error: "name or number missing",
		});
	}
	const exist = data.find((person) => person.name === body.name);
	if (exist) {
		return res.status(400).json({
			error: "name must be unique",
		});
	}
	const person = {
		id: Math.floor(Math.random() * 1000),
		name: body.name,
		number: body.number,
	};
	data = data.concat(person);
	res.json(person);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
