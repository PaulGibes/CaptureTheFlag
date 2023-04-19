import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        password
        username
      }
    }
  }
`;

export const CREATE_GAME = gql`
mutation Mutation($status: String!, $teamOne: [String!]) {
  createGame(status: $status, teamOne: $teamOne) {
    _id
    teamTwoCount
    teamOneCount
    status
  }
}
`;

export const JOIN_QUEUE = gql`
mutation Mutation($users: [String!]) {
  joinGame(users: $users) {
    userCount
    users {
      _id
    }
  }
}
`;

export const EXIT_QUEUE = gql`
mutation Mutation($id: String!) {
  exitQueue(_id: $id) {
    userCount
    users {
      _id
    }
  }
}
`;


