import React, { useEffect } from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import HighscoreBoard from "../HighscoreBoard";
import { Link } from "react-router-dom";

import MapLogic from "../../utils/mapLogic";
import Battlefield from "./Battlefield";
import Auth from "../../utils/auth";
import { QUERY_SINGLE_USER, GET_GAME } from "../../utils/queries";
import { useQuery, useApolloClient } from "@apollo/client";

function GamePlay() {
  var baseField = [
    { id: "1-1", player: " ", active: false, image: "" },
    { id: "1-2", player: " ", active: false, image: "" },
    { id: "1-3", player: " ", active: false, image: "" },
    { id: "1-4", player: " ", active: false, image: "" },
    { id: "1-5", player: " ", active: false, image: "" },
    { id: "1-6", player: " ", active: false, image: "" },
    { id: "1-7", player: " ", active: false, image: "" },
    { id: "1-8", player: " ", active: false, image: "" },
    { id: "1-9", player: " ", active: false, image: "" },
    { id: "1-10", player: " ", active: false, image: "" },
    { id: "1-11", player: " ", active: false, image: "" },
    { id: "1-12", player: " ", active: false, image: "" },
    { id: "2-1", player: " ", active: false, image: "" },
    { id: "2-2", player: " ", active: false, image: "" },
    { id: "2-3", player: " ", active: false, image: "" },
    { id: "2-4", player: " ", active: false, image: "" },
    { id: "2-5", player: " ", active: false, image: "" },
    { id: "2-6", player: " ", active: false, image: "" },
    { id: "2-7", player: " ", active: false, image: "" },
    { id: "2-8", player: " ", active: false, image: "" },
    { id: "2-9", player: " ", active: false, image: "" },
    { id: "2-10", player: " ", active: false, image: "" },
    { id: "2-11", player: " ", active: false, image: "" },
    { id: "2-12", player: " ", active: false, image: "" },
    { id: "3-1", player: " ", active: false, image: "" },
    { id: "3-2", player: " ", active: false, image: "" },
    { id: "3-3", player: " ", active: false, image: "" },
    { id: "3-4", player: " ", active: false, image: "" },
    { id: "3-5", player: " ", active: false, image: "" },
    { id: "3-6", player: " ", active: false, image: "" },
    { id: "3-7", player: " ", active: false, image: "" },
    { id: "3-8", player: " ", active: false, image: "" },
    { id: "3-9", player: " ", active: false, image: "" },
    { id: "3-10", player: " ", active: false, image: "" },
    { id: "3-11", player: " ", active: false, image: "" },
    { id: "3-12", player: " ", active: false, image: "" },
    { id: "4-1", player: " ", active: false, image: "" },
    { id: "4-2", player: " ", active: false, image: "" },
    { id: "4-3", player: " ", active: false, image: "" },
    { id: "4-4", player: " ", active: false, image: "" },
    { id: "4-5", player: " ", active: false, image: "" },
    { id: "4-6", player: " ", active: false, image: "" },
    { id: "4-7", player: " ", active: false, image: "" },
    { id: "4-8", player: " ", active: false, image: "" },
    { id: "4-9", player: " ", active: false, image: "" },
    { id: "4-10", player: " ", active: false, image: "" },
    { id: "4-11", player: " ", active: false, image: "" },
    { id: "4-12", player: " ", active: false, image: "" },
    { id: "5-1", player: " ", active: false, image: "" },
    { id: "5-2", player: " ", active: false, image: "" },
    { id: "5-3", player: " ", active: false, image: "" },
    { id: "5-4", player: " ", active: false, image: "" },
    { id: "5-5", player: " ", active: false, image: "" },
    { id: "5-6", player: " ", active: false, image: "" },
    { id: "5-7", player: " ", active: false, image: "" },
    { id: "5-8", player: " ", active: false, image: "" },
    { id: "5-9", player: " ", active: false, image: "" },
    { id: "5-10", player: " ", active: false, image: "" },
    { id: "5-11", player: " ", active: false, image: "" },
    { id: "5-12", player: " ", active: false, image: "" },
  ];

  //get updated data from local storage
  const mainField = JSON.parse(localStorage.getItem("nextRound")) || baseField;

  //get game id from url params
  var urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("game"));

  //Get current username
  const currentUser = Auth.getUsername();
  console.log(currentUser);

  const client = useApolloClient();

  // fetch and update my position
  function updateMap() {
    client
      .query({
        query: GET_GAME,
        variables: { gameId: urlParams.get("game") },
        //fetchPolicy: "cache-first"   // select appropriate fetchPolicy
      })
      .then((response) => {
        const gameData = response.data.game;
        console.log(gameData);
        baseField[getIndex(gameData.flagOne)].player = "TeamOne Flag";
        baseField[getIndex(gameData.flagTwo)].player = "TeamTwo Flag";

        gameData.teamOne.forEach((player) => {
          if (player.position) {
            let index = getIndex(player.position);
            baseField[index].player = player.username;

            if (player.username == currentUser) {
              baseField[index].active = true;
            }
          } else {
            if (player.username == currentUser) {
              baseField[13].active = true;
            }
            baseField[13].player = player.username;
          }
        });

        gameData.teamTwo.forEach((player) => {
          if (player.position) {
            let index = getIndex(player.position);
            baseField[index].player = player.username;

            if (player.username == currentUser) {
              baseField[index].active = true;
            }
          } else {
            if (player.username == currentUser) {
              baseField[22].active = true;
            }
            baseField[22].player = player.username;
          }
        });

        gameData.bots.forEach((bot) => {
          baseField[getIndex(bot.position)].player =
            bot.botName + " Team:" + bot.team;
        });

        MapLogic.activatePossibleMoves(baseField);
        localStorage.setItem("nextRound", JSON.stringify(baseField));
      });
  }

  function getIndex(value) {
    return baseField.findIndex((tile) => tile.id === value);
  }

  function startTimer() {
    var timer = 5;
    console.log("Timer started");
    var interval = setInterval(function () {
      document.getElementById("timer").textContent = "00:0" + timer;
      if (timer == 1) {
        updateMap();
      }
      if (timer == 0) {
        clearInterval(interval);
        window.location.reload();
      }
      timer--;
    }, 1000);
  }

  startTimer();

  //const fieldMap = ;
  return (
    <div className="mt-40">
      <div className="flex justify-between px-10">
        <div className="flex">
          <AiOutlineFlag className="text-xl mr-5 text-red-600" />
          <h2 className="text-xl text-white  mr-2">The Outsiders</h2>
          <h2 className="text-xl text-white">
            :<span className="font-bold accent ml-2">45</span>
          </h2>
        </div>
        <div>
          <h2 className="text-white">
            Timer
            <span id="timer" className="ml-2 accent font-bold">
              00:05
            </span>
          </h2>
        </div>
        <div className="flex">
          <AiOutlineFlag className="text-xl mr-5 text-blue-600" />
          <h2 className="text-xl text-white mr-2">The Insiders</h2>
          <h2 className="text-xl text-white">
            :<span className="font-bold accent ml-2">20</span>
          </h2>
        </div>
      </div>
      <Battlefield fieldMap={mainField} />
    </div>
  );
}

export default GamePlay;
