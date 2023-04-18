const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
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
  },
};

module.exports = resolver;
