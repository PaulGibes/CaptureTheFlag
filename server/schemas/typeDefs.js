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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Bot {
    _id: ID
    botName: String
    position: String
    team: String
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

  type Queue{
    users: [User!]
    userCount: Int
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    games: [Game]!
    game(gameId: ID!): Game
    fillGame(gameId: ID!): Game
  }

  type Mutation {
    addUser(username: String!, password: String!): User
    login(username: String!, password: String!): Auth
    createGame(status: String! teamOne: [String!]): Game
    joinGame(users: [String!]): Queue
    exitQueue(_id: String!): Queue
  }
`;

 module.exports = typeDefs;
