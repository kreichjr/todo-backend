const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const todoSchema = new Schema({
	completed: { type: Boolean, default: false },
	message: { type: String },
	created: { type: Date, default: Date.now }
	/* priority ....*/
})

const Todo = mongoose.model('Todo', todoSchema)




const database = mongoose.connect("mongodb://127.0.0.1:27017/todo")
	.then(() => console.log("Connected to the database"))


const app = express();





app.use(bodyParser.json())

app.get("/hello", (request, response) => {
	response.status(200).send("Hello, World!");
})

app.get("/todo", (req, res) => {
	Todo.find({}, (err, todos) => {
		if (err) res.status(400).send("Save failed with error: " + err.message)
	    else res.status(200).send(todos)

	})

})

app.post("/todo", (req, res) => {
	const newTodo = new Todo({
		message: req.body.message
	})
	newTodo.save((err, savedTodo) => {
		if (err) res.status(400).send("Save failed with error: " + err.message)
	    else res.status(200).send(savedTodo)
	})

})

app.put("/todo", (req, res) => {
	Todo.findById(req.body.id, (err, todo) => {
		if (err) {
			res.status(400).send("Error, bitch")
		} else {
			todo = Object.assign(todo, req.body);
			todo.save((err, savedTodo) => {
				if (err) res.status(400).send("Save failed with error: " + err.message)
	    		else res.status(200).send(savedTodo)
	    	})
		}
	})
})




app.listen(3000, () => {
	console.log("Server is running on port 3000.");
})


