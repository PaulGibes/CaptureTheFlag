const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolver = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username: username });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You must be logged in to view this page");
    },

    scores: async () => {
      const scores = await User.find();

      const byWins = scores.slice(0);

      byWins.sort(function (a, b) {
        return a.wins - b.wins;
      });

      return byWins.reverse();
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
        throw new AuthenticationError("Username incorrect.");
      }

      const passwordCheck = await user.isCorrectPassword(password);

      if (!passwordCheck) {
        throw new AuthenticationError("Password incorrect.");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolver;
