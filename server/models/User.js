const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  wins: { type: Number },
  loses: { type: Number },
  position: { type: String },
  hasFlag: { type: Boolean },
  isHost: { type: Boolean },
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  image: {type: String}
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  if (this.isNew) {
    this.wins = 0;
    this.loses = 0;
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
