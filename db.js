const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const Todo = new Schema({
  userId: { type: ObjectId },
  title: { type: String },
  body: { type: String },
  complete: { type: Boolean, default: false },
});

const userModel = mongoose.model("users", User);
const todoModel = mongoose.model("todos", Todo);

module.exports = {
  userModel,
  todoModel,
};
