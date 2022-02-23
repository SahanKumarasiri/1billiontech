const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({ //create schema for todos
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
  checkingDate:{
    type:String
  }
});

const newTodo = mongoose.model("todo", Todo); //create database collection
module.exports = newTodo;
