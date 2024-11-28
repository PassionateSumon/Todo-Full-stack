const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: { type: String, unique: true },
  // email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userId: ObjectId,
  title: String,
  body: String,
  complete: Boolean,
});

const userModel = mongoose.model("users", User);
const todoModel = mongoose.model("todos", Todo);

module.exports = {
  userModel,
  todoModel,
};
