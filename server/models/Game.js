const { Schema, model } = require("mongoose");

//Bot subdocument
const botSchema = new Schema(
  {
    botName:{
      type: String,
    },
    position:{
      type: Object,
    },
    team:{
      type: String,
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
    required: true,
  },
  teamOne:[ {type: Schema.Types.ObjectId, ref: 'User'}],
  teamTwo:[ {type: Schema.Types.ObjectId, ref: 'User'}],
  flagOne: {
    type: Object
  },
  flagTwo: {
    type: Object
  },
  bots:[botSchema],
  winner:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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