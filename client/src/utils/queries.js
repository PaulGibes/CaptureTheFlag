import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query oneUser {
    user {
      _id
      username
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

export const GET_GAME = gql`
query Query($gameId: ID!) {
  game(gameId: $gameId) {
    _id
    status
    teamOne {
      _id
      username
      position
      hasFlag
    }
    teamTwo {
      _id
      username
      position
      hasFlag
    }
    flagOne
    flagTwo
    bots {
      _id
      botName
      position
      team
    }
    winner
    teamOneCount
    teamTwoCount
  }
}
`;

export const GET_GAMES = gql`
query Game($gameId: ID!) {
  game(gameId: $gameId) {
    _id
    status
    teamOne {
      _id
      username
      position
      hasFlag
    }
    teamTwo {
      _id
      username
      position
      hasFlag
    }
    flagOne
    flagTwo
    bots {
      _id
      botName
      position
      team
    }
    winner
    teamOneCount
    teamTwoCount
  }
}
`;

export const FILL_GAME = gql`
query Query($gameId: ID!) {
  fillGame(gameId: $gameId) {
    _id
    status
    flagOne
    flagTwo
    winner
    teamOneCount
    teamTwoCount
  }
}
`;
