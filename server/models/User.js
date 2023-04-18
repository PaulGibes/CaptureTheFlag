const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  wins: { type: Number },
  loses: { type: Number },
  position: { type: String },
  hasFlag: { type: Boolean },
});

//automatically encrypts "password" field.
UserSchema.plugin(require("mongoose-bcrypt"));

const User = model("User", userSchema);

module.exports = User;
