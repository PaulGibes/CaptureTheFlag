import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $image: String) {
    addUser(username: $username, password: $password, image: $image) {
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
    joinQueue(users: $users) {
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

export const FILL_GAME = gql`
  mutation Mutation($gameId: ID!) {
    fillGame(gameId: $gameId) {
      _id
    }
  }
`;

export const START_GAME = gql`
  mutation ($gameId: ID!, $teamLimit: Int!) {
    startGame(gameId: $gameId, teamLimit: $teamLimit) {
      _id
    }
    hostUser {
      _id
      username
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation Mutation($username: String!, $position: String!) {
    updatePosition(username: $username, position: $position) {
      username
      position
      }
    }
  `;

export const HAS_FLAG = gql`
 mutation Mutation($username: String!, $hasFlag: Boolean!) {
  updateFlag(username: $username, hasFlag: $hasFlag) {
    username
    hasFlag
  }
 }
`;
