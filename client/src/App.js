import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/NavBar";
import ChooseGame from "./components/pages/ChooseGame";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import EndGame from "./components/pages/EndGame";
import GamePlay from "./components/pages/GamePlay";
import WaitingRoom from "./components/pages/WaitingRoom";
import Highscores from "./components/pages/Highscores";
import HowToPlay from "./components/pages/HowToPlay";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose-game" element={<ChooseGame />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gameplay" element={<GamePlay />} />
          <Route path="/endgame" element={<EndGame />} />
          <Route path="/waitingRoom" element={<WaitingRoom />} />
          <Route path="/highscores" element={<Highscores />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
