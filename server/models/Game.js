const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  status: {      
    type: String,
    unique: true,
    required: true,
  },
  teamOne:{ type: Schema.Types.ObjectId, ref: 'user'},
  teamTwo:{ type: Schema.Types.ObjectId, ref: 'user'},
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

//Bot subdocument
const botSchema = new Schema(
  {
    botName:{
      type: String,
    },
    coordinates:{
      type: Object,
    },
    team:{
      type: Integer,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property to count the current amount of human players
gameSchema.virtual('teamOneCount').get(function () {
  return this.teamOne.length;
});

// Create a virtual property to count the current amount of human players
gameSchema.virtual('teamTwoCount').get(function () {
  return this.teamTwo.length;
});

const Game = model("Game", gameSchema);

module.exports = gameSchema;
