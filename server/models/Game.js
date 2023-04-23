const { Schema, model } = require("mongoose");

//Bot subdocument
const botSchema = new Schema(
  {
    botName: {
      type: String,
    },
    position: {
      type: Object,
    },
    team: {
      type: String,
    },
    hasFlag: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const gameSchema = new Schema({
  status: {
    type: String,
    default: "open",
  },
  teamOne: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teamTwo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  flagOne: {
    type: String,
    default: "3-2",
  },
  flagTwo: {
    type: String,
    default: "3-11",
  },
  bots: [botSchema],
  winner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  flagsToWin: {
    type: Number,
    default: 1
  },
  teamPlayers: {
    type: Number,
    default: 2
  },
  difficulty: {
    type: String,
    default: "easy"
  }
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

// Create a virtual property to count the current amount of human players
gameSchema.virtual('teamOneCount').get(function () {
  return this.teamOne.length;
});

// Create a virtual property to count the current amount of human players
gameSchema.virtual('teamTwoCount').get(function () {
  return this.teamTwo.length;
});

const Game = model("Game", gameSchema);

module.exports = Game;
