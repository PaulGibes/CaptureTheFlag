const { AuthenticationError } = require("apollo-server-express");
const { User, Game, Queue } = require("../models");
const { signToken } = require("../utils/auth");
const { moveBot, newTest } = require("../utils/botBrains")

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

    games: async () => {
      return Game.find().populate("teamTwo").populate("teamOne");
    },

    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId })
        .populate("teamTwo")
        .populate("teamOne");
    },

    scores: async () => {
      const scores = await User.find();

      const byWins = scores.slice(0);

      byWins.sort(function (a, b) {
        return a.wins - b.wins;
      });

      return byWins.reverse();
    },

    botMove: async (parent, { gameId }) => {
      const game = await Game.findOne({ _id: gameId })
        .populate("teamTwo")
        .populate("teamOne")
        .then((game) => {
          console.log("hello world");
          moveBot(game);
          return game;
        })
      return game;
    },
  },

  Mutation: {
    addUser: async (parent, { username, password, image }) => {
      const user = User.create({ username, password, image });
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

    createGame: async (parent, { username, teamOne, flagsToWin, teamPlayers, difficulty }) => {
      const game = Game.create({ username, teamOne, flagsToWin, teamPlayers, difficulty });

      return game;
    },

    //add a user to the queue
    joinQueue: async (parent, { userId }) => {
      const queue = await Queue.findOneAndUpdate(
        {},
        {
          $addToSet: { users: userId },
        },
        {
          new: true,
        }
      );

      return queue;
    },

    // remove a user from the queue
    exitQueue: async (parent, { userId }) => {
      // console.log(username);
      const queue = Queue.findOneAndUpdate(
        {},
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      );

      return queue;
    },

    //fill the game with the users available in the queue and remove them from the queue
    fillGame: async (parent, { gameId }) => {
      await Game.findOne({ _id: gameId })
        .populate("teamTwo")
        .populate("teamOne")
        .then((game) => {
          //getting current team count
          var teamOne = game.teamOneCount;
          var teamTwo = game.teamTwoCount;

          //get data from queue
          Queue.findOne().then((queue) => {
            //get user count
            var userCount = queue.userCount;
            var recordAdded = 0;

            //move users from queue to a game
            while (userCount > 0 && (teamOne < 3 || teamTwo < 3)) {
              var updateData = {};

              console.log(
                "Current user: " +
                queue.users[recordAdded] +
                " count " +
                userCount
              );
              if (teamTwo < teamOne) {
                updateData = {
                  $addToSet: { teamTwo: queue.users[recordAdded] },
                };
                teamTwo++;
              } else if (teamOne <= teamTwo) {
                updateData = {
                  $addToSet: { teamOne: queue.users[recordAdded] },
                };
                teamOne++;
              }

              //add the user to a team
              Game.findOneAndUpdate(
                {
                  _id: gameId,
                },
                updateData,
                {
                  new: true,
                }
              ).then((updatedGame) => { });

              //remove user from queue
              Queue.findOneAndUpdate(
                {},
                {
                  $pull: { users: queue.users[recordAdded] },
                },
                {
                  new: true,
                }
              ).then((response) => { });
              //updating counters for while loop
              userCount--;
              recordAdded++;
            }
          });

          return game;
        });
    },

    startGame: async (parent, { gameId, teamLimit }) => {
      await Game.findOne({ _id: gameId })
        .populate("teamTwo")
        .populate("teamOne")
        .then((game) => {
          //get current count for each team
          var teamOne = game.teamOneCount;
          var teamTwo = game.teamTwoCount;

          var teamOnePositions = ["2-2", "3-3", "4-2"];
          var teamTwoPositions = ["2-11", "3-10", "4-11"];

          //console.log(game.teamOne[0]._id);
          //update human positions for team one
          for (let i = 0; i < teamOne.length; i++) {
            User.findOneAndUpdate(
              {
                _id: game.teamOne[i]._id,
              },
              {
                position: teamOnePositions[i],
              },
              {
                new: true,
              }
            );
          }
          
          //update human positions for team two
          for (let i = 0; i < teamTwo.length; i++) {
            User.findOneAndUpdate(
              {
                _id: game.teamOne[i]._id,
              },
              {
                position: teamTwoPositions[i],
              },
              {
                new: true,
              }
            );
          }

          // fill remaining team with bots
          while (teamOne < teamLimit || teamTwo < teamLimit) {
            var botData = {
              botName: "Bot" + Math.floor(Math.random() * 50),
              position: null,
              team: null,
              image: ""
            };

            if (teamTwo < teamOne) {
              botData.team = 2;
              botData.position = teamTwoPositions[teamTwo];
              botData.image ="avatar-" + Math.floor(Math.random() * 3 + 1);
              teamTwo++;
            } else if (teamOne <= teamTwo) {
              botData.team = 1;
              botData.position = teamOnePositions[teamOne];
              botData.image ="avatar-" + Math.floor(Math.random() * 3 + 1);
              teamOne++;
            }

            //add the bot to a team
            Game.findOneAndUpdate(
              {
                _id: gameId,
              },
              {
                status: "started",
                $addToSet: { bots: botData },
              },
              {
                new: true,
              }
            ).then((updatedGame) => { });
          }

          return { message: "Success" };
        });
    },

    updatePosition: async (parent, { username, position }) => {
      const user = await User.findOneAndUpdate(
        { username: username },
        { position: position },
        { new: true }
      );
      return user;
    },

    updateFlag: async (parent, { username, hasFlag }) => {
      const user = await User.findOneAndUpdate(
        { username: username },
        { hasFlag: hasFlag },
        { new: true }
      );
      return user;
    },

    updateIsHost: async (parent, { username, isHost }) => {
      const user = await User.findOneAndUpdate(
        { username: username },
        { isHost },
        { new: true }
      );
      return user;
    },
  },
};

module.exports = resolver;