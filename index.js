const Express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = Express();
const serverConfig = require("./env");
const Person = require("./models/Person");

const PORT = serverConfig.getServerPort();

const data = [
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

// middlewares

//3.8 registrar mensajes en tu consola según la configuración tiny.
morgan.token("body", (req, res) => JSON.stringify(req.body));
const logger = morgan(
	":method :url :status :res[content-length] - :response-time ms :body",
);

//3.16 manejo de errores
const errorHandler = (error, req, res, next) => {
	console.error(error.name, error.message);

	switch (error.name) {
		case "CastError":
			return res.status(400).send({ error: "malformatted id" });
		case "ValidationError":
			return res.status(400).json({ error: error.message });
	}

	next(error);
};

// routes
app.use(cors());
app.use(Express.json());
app.use(logger);
app.use(express.static("dist"));

//3.1 Devuelve toda la información
app.get("/api/persons", (req, res) => {
	console.log("modelo", Person);
	Person.find({}).then((persons) => {
		res.json(persons);
	});
});

//3.2 La página informativa
//3.18 usa la base de datos
app.get("/info", (req, res) => {
	const date = new Date();
	Person.countDocuments({}).then((count) => {
		res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
	});
});

// 3.3 mostrar la información de una sola entrada
//3.18 uso de la base de datos
app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

// 3.4  eliminar una sola entrada de la agenda telefónica
// 3.15 elimina en la base de datos
app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => next(error));
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
	const person = new Person({
		id: Math.floor(Math.random() * 1000),
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => {
		res.json(savedPerson);
	});
});

// 3.17 actualizar el número de una entrada existente
app.put("/api/persons/:id", (req, res, next) => {
	const { name, number } = req.body;

	Person.findByIdAndUpdate(
		req.params.id,
		{ name, number },
		{ new: true, runValidators: true },
	)
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

//3.16 manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Phonebook Server is running on port ${PORT}`);
});
