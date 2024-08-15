const mongoose = require("mongoose");
const dataBaseConfig = require("../env");

const url = dataBaseConfig.getMongoURI();

// conexion a mongodb
mongoose.set("strictQuery", false);
mongoose
	.connect(url)
	.then((response) => {
		console.log("Mongo DB Connected");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});

// Esquema
const PersonSchema = new mongoose.Schema({
	name: { type: String, required: true },
	number: { type: String, required: true },
});

PersonSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		returnedObject._id = undefined;
		returnedObject.__v = undefined;
	},
});

// exporta el Modelo Person
module.exports = mongoose.model("Person", PersonSchema);
