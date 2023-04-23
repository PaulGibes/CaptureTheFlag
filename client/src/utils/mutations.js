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
  mutation createGame($username: String!) {
    createGame(username: $username) {
      _id
      teamTwoCount
      teamOneCount
      status
    }
  }
`;

export const JOIN_QUEUE = gql`
  mutation joinQueue($username: String!) {
    joinQueue(username: $username) {
      userCount
      users {
        username
      }
    }
  }
`;

export const EXIT_QUEUE = gql`
  mutation Mutation($username: String!) {
    exitQueue(username: $username) {
      userCount
      users {
        username
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
    hostUser {
      _id
      username
    }
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

export const UPDATE_ISHOST = gql`
  mutation updateIsHost($username: String!, $isHost: Boolean!) {
    updateIsHost(username: $username, isHost: $isHost) {
      username
      isHost
      }
    }
  `;
