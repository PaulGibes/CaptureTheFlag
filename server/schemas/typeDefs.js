const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    wins: Int
    loses: Int
    position: String
    hasFlag: Boolean
    isHost: Boolean
    game: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Bot {
    _id: ID
    botName: String
    position: String
    team: Int
    hasFlag: Boolean
  }

  type Game {
    _id: ID
    status: String!
    teamOne: [User!]
    teamTwo: [User!]
    flagOne: String
    flagTwo: String
    bots: [Bot]!
    winner: Int
    teamOneCount: Int
    teamTwoCount: Int
  }

  type Queue {
    users: [User!]
    userCount: Int
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User
    games: [Game]!
    game(gameId: ID!): Game
    scores: [User]!
    botMove(gameId: ID!): Game
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createGame(status: String!, teamOne: [String!]): Game
    joinQueue(users: [String!]): Queue
    exitQueue(_id: String!): Queue
    fillGame(gameId: ID!): Game
    startGame(gameId: ID!, teamLimit: Int!): Game
    updatePosition(username: String!, position: String!): User
    updateFlag(username: String!, hasFlag: Boolean): User
  }
`;

module.exports = typeDefs;
