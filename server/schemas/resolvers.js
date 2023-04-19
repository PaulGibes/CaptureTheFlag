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

    fillGame: async (parent, { gameId }) => {
      const game = await Game.findOne({ _id: gameId }).populate("teamTwo").populate("teamOne")
        .then((game) => {
          //console.log(game)
          var teamOne = game.teamOneCount;
          var teamTwo = game.teamTwoCount;

          Queue.findOne()
            .then((queue) => {
              //console.log(queue.userCount);
              var userCount = queue.userCount;
              var recordAdded = 0;

              while (userCount > 0 && (teamOne < 3 || teamTwo < 3)) {
                var updateData = {};

                console.log(queue.users[recordAdded])
                if (teamTwo < teamOne) {
                  updateData = { $addToSet: { teamTwo: queue.users[recordAdded] } }
                  teamTwo++;
                } else if (teamOne <= teamTwo) {
                  updateData = { $addToSet: { teamOne: queue.users[recordAdded] } }
                  teamOne++;
                }
                recordAdded++;

                //add the user to a team
                Game.findOneAndUpdate(
                  {
                    _id: gameId
                  },
                  updateData,
                  {
                    new: true
                  })
                  .then((updatedGame) => {
                    
                  });

                //remove user from queue
                Queue.findOneAndUpdate(
                  {

                  },
                  {
                    $pull: { users: { _id: queue.users[recordAdded]}},
                  },
                  {
                    new: true,
                  }
                  ).then((response)=>{console.log(response)});
                userCount--;
              }
            })

          return game;
        });
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

    exitQueue: async (parent, { _id }) => {
      const queue = Queue.findOneAndUpdate(
        {

        },
        {
          $pull: { users: _id },
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
