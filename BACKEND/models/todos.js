const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  todo: {
    type: String,
  },
  plannedDate: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  dateModified: {
    type: String,
  },
  email: {
    type: String, 
  },
  resolved: {
    type: Boolean,
  },
});

const newTodo = mongoose.model("todo", Todo);
module.exports = newTodo;
