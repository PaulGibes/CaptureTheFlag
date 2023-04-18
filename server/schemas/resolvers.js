const { AuthenticationError } = require("apollo-server-express");
const { User, Game, Queue } = require("../models");
const { signToken } = require("../utils/auth");

const resolver = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You must be logged in to view this page");
    },

    games: async () => {
      return Game.find().populate("teamTwo").populate("teamOne");
    },

    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId }).populate("teamTwo").populate("teamOne");
    },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = User.create({ username, password });
      const token = signToken(user);

      return { user, token };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new AuthenticationError("Username of password incorrect.");
      }

      const passwordCheck = await user.isCorrectPassword(password);

      if (!passwordCheck) {
        throw new AuthenticationError("Username of password incorrect.");
      }

      const token = signToken(user);
      return { token, user };
    },

    createGame: async (parent, { status, teamOne }) => {
      const game = Game.create({ status, teamOne });

      return game;
    },

    joinGame: async (parent, { users }) => {
      const queue = Queue.findOneAndUpdate(
        {

        },
        {
          $addToSet: { users },
        },
        {
          new: true,
        }
      );

      return queue;
    },
  },
};

module.exports = resolver;
