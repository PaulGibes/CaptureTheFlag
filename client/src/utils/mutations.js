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
  mutation createGame($username: String!, $flagsToWin: Int, $teamPlayers: Int, $difficulty: String) {
    createGame(username: $username, flagsToWin: $flagsToWin,teamPlayers: $teamPlayers, difficulty: $difficulty,) {
      _id
      teamTwoCount
      teamOneCount
      status
      flagsToWin
      teamPlayers
      difficulty
    }
  }
`;

export const JOIN_QUEUE = gql`
  mutation joinQueue($userId: String!) {
    joinQueue(userId: $userId) {
      userCount
      users {
        _id
      }
    }
  }
`;

export const EXIT_QUEUE = gql`
  mutation exitQueue($userId: String!) {
    exitQueue(userId: $userId) {
      userCount
      users {
        _id
      }
    }
  }
`;

export const FILL_GAME = gql`
  mutation fillGame($gameId: ID!) {
    fillGame(gameId: $gameId) {
      _id
    }
  }
`;

export const START_GAME = gql`
  mutation startGame($gameId: ID!, $teamLimit: Int!) {
    startGame(gameId: $gameId, teamLimit: $teamLimit) {
    _id
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
