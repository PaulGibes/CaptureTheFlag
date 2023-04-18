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

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!, password: String!): User
  }
`;

 module.exports = typeDefs;
