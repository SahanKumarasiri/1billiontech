const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  todo: {
    type: String,
    required: true,
  },
  plannedDate: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

const newTodo = mongoose.model("todo", Todo);
module.exports = newTodo;
