const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {},
  email: {},
  password: {},
  //high scores or other things here.
});

const User = model("User", userSchema);

module.exports = User;
