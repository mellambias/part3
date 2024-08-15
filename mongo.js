const mongoose = require("mongoose");

if (process.argv.length < 3 || process.argv.length > 5) {
	console.log("================  USE  ==================================");
	console.log("Get All people : node mongo.js <password>");
	console.log("Add new person : node mongo.js <password> <name> <number>");
	console.log("==========================================================");
	process.exit(1);
}
const password = process.argv[2];
let name = null;
let number = null;
let person = null;

const url = `mongodb+srv://service:${password}@fullstackopen.zbjmh.mongodb.net/?retryWrites=true&w=majority&appName=fullstackopen`;

// conexion a mongodb
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Esquema
const PersonSchema = new mongoose.Schema({
	name: { type: String, required: true },
	number: { type: String, required: true },
});

// Modelo
const Person = mongoose.model("Person", PersonSchema);

switch (process.argv.length) {
	case 3:
		// Mostrar todas las entradas
		Person.find({}).then((result) => {
			console.log("**** phonebook ****");
			for (person of result) {
				console.log(`- ${person.name} ${person.number}`);
			}
			console.log("-------------------");
			mongoose.connection.close();
		});
		break;
	case 5:
		// Crear un nuevo documento
		name = process.argv[3];
		number = process.argv[4];
		person = new Person({
			name,
			number,
		});

		person.save().then((result) => {
			console.log(`added ${name} number ${number} to phonebook`);
			mongoose.connection.close();
		});
		break;
	default:
		console.log("Incorrect argument number");
		process.exit(1);
}
