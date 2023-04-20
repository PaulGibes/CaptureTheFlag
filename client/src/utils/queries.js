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
  query ($username: String!) {
    user (username: $username) {
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

export const QUERY_SCORES = gql`
  query allUsers {
    scores {
      _id
      username
      wins
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
