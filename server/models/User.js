const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  wins: { type: Number },
  loses: { type: Number },
  position: { type: String },
  hasFlag: { type: Boolean },
});

const User = model("User", userSchema);

module.exports = User;
