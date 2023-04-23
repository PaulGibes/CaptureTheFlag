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
    { id: '1-1', player: " ", active: false, image: "", },
    { id: '1-2', player: " ", active: false, image: "", },
    { id: '1-3', player: " ", active: false, image: "", },
    { id: '1-4', player: " ", active: false, image: "", },
    { id: '1-5', player: " ", active: false, image: "", },
    { id: '1-6', player: " ", active: false, image: "", },
    { id: '1-7', player: " ", active: false, image: "", },
    { id: '1-8', player: " ", active: false, image: "", },
    { id: '1-9', player: " ", active: false, image: "", },
    { id: '1-10', player: " ", active: false, image: "", },
    { id: '1-11', player: " ", active: false, image: "", },
    { id: '1-12', player: " ", active: false, image: "", },
    { id: '2-1', player: " ", active: false, image: "", },
    { id: '2-2', player: " ", active: false, image: "", },
    { id: '2-3', player: " ", active: false, image: "", },
    { id: '2-4', player: " ", active: false, image: "", },
    { id: '2-5', player: " ", active: false, image: "", },
    { id: '2-6', player: " ", active: false, image: "", },
    { id: '2-7', player: " ", active: false, image: "", },
    { id: '2-8', player: " ", active: false, image: "", },
    { id: '2-9', player: " ", active: false, image: "", },
    { id: '2-10', player: " ", active: false, image: "", },
    { id: '2-11', player: " ", active: false, image: "", },
    { id: '2-12', player: " ", active: false, image: "", },
    { id: '3-1', player: " ", active: false, image: "", },
    { id: '3-2', player: " ", active: false, image: "", },
    { id: '3-3', player: " ", active: false, image: "", },
    { id: '3-4', player: " ", active: false, image: "", },
    { id: '3-5', player: " ", active: false, image: "", },
    { id: '3-6', player: " ", active: false, image: "", },
    { id: '3-7', player: " ", active: false, image: "", },
    { id: '3-8', player: " ", active: false, image: "", },
    { id: '3-9', player: " ", active: false, image: "", },
    { id: '3-10', player: " ", active: false, image: "", },
    { id: '3-11', player: " ", active: false, image: "", },
    { id: '3-12', player: " ", active: false, image: "", },
    { id: '4-1', player: " ", active: false, image: "", },
    { id: '4-2', player: " ", active: false, image: "", },
    { id: '4-3', player: " ", active: false, image: "", },
    { id: '4-4', player: " ", active: false, image: "", },
    { id: '4-5', player: " ", active: false, image: "", },
    { id: '4-6', player: " ", active: false, image: "", },
    { id: '4-7', player: " ", active: false, image: "", },
    { id: '4-8', player: " ", active: false, image: "", },
    { id: '4-9', player: " ", active: false, image: "", },
    { id: '4-10', player: " ", active: false, image: "", },
    { id: '4-11', player: " ", active: false, image: "", },
    { id: '4-12', player: " ", active: false, image: "", },
    { id: '5-1', player: " ", active: false, image: "", },
    { id: '5-2', player: " ", active: false, image: "", },
    { id: '5-3', player: " ", active: false, image: "", },
    { id: '5-4', player: " ", active: false, image: "", },
    { id: '5-5', player: " ", active: false, image: "", },
    { id: '5-6', player: " ", active: false, image: "", },
    { id: '5-7', player: " ", active: false, image: "", },
    { id: '5-8', player: " ", active: false, image: "", },
    { id: '5-9', player: " ", active: false, image: "", },
    { id: '5-10', player: " ", active: false, image: "", },
    { id: '5-11', player: " ", active: false, image: "", },
    { id: '5-12', player: " ", active: false, image: "", },
  ];

  const mainField = JSON.parse(localStorage.getItem("nextRound")) || baseField;

  var urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get('game'));

  //Get current username
  const currentUser = Auth.getUsername()
  console.log(currentUser)

  const client = useApolloClient();

  // fetch and update my position
  function getMyPosition() {

    client.query({
      query: GET_GAME,
      variables: { gameId: urlParams.get('game') },
      //fetchPolicy: "cache-first"   // select appropriate fetchPolicy
    }).then((response) => {
      const gameData = response.data.game;
      baseField[getIndex(gameData.flagOne)].player = "TeamOne Flag"
      baseField[getIndex(gameData.flagTwo)].player = "TeamTwo Flag"

      gameData.teamOne.forEach(player => {
        let index = getIndex(player.position)
        baseField[index].player = player.username;
        
        if(player.username == currentUser){
          baseField[index].active = true;
        }
      });

      gameData.teamTwo.forEach(player => {
        let index = getIndex(player.position)
        baseField[index].player = player.username;

        if(player.username == currentUser){
          baseField[index].active = true;
        }
      });

      gameData.bots.forEach(bot => {
        
        baseField[getIndex(bot.position)].player = bot.botName + " Team:" + bot.team;
       
      });

      MapLogic.activatePossibleMoves(baseField);
      localStorage.setItem("nextRound", JSON.stringify(baseField));
    }).catch((err) => {
      console.log(err)
    })
  };

  function getIndex (value) {
    return baseField.findIndex(tile => tile.id === value);
  }

  function startTimer(display) {
    var timer = 5;
    console.log("Timer started");
    var interval = setInterval(function () {
      document.getElementById("timer").textContent = "00:0" + timer;
      if (timer == 1) {
        //startNewRound(mainField);
        getMyPosition();
      }
      if (timer == 0) {
        getMyPosition();
        clearInterval(interval);
        //startNewRound([...baseField]);
        window.location.reload();
      }
      timer--;
    }, 1000);
  }

  startTimer();

  //const fieldMap = ;
  return (
    <div className="">
      <div className="flex justify-between px-10">
        <div className="flex">
          <h2 className="text-xl mr-2">The Outsiders</h2>
          <h2 className="text-xl">
            Score:<span className="font-bold ml-2">45</span>
          </h2>
        </div>
        <div>
          <h2>
            Timer<span id="timer" className="ml-2 font-bold">00:05</span>
          </h2>
        </div>
        <div className="flex">
          <h2 className="text-xl mr-2">The Machines</h2>
          <h2 className="text-xl">
            Score:<span className="font-bold ml-2">20</span>
          </h2>
        </div>
      </div>
      <Battlefield fieldMap={mainField} />
      {/* <div className="grid grid-cols-12 p-10 min-h-screen">
        {fieldMap.map((id, index) => {
          return (
            <div
              key={fieldMap[index].id}
              id={fieldMap[index].id}
              onClick={fieldMap[index].active ? () => activeSpace(fieldMap[index].id) : doNothing}
              className={"hover:bg-indigo-500 border-solid border-2 border-indigo-600 cursor-pointer min-h-[100px]"}
              style={fieldMap[index].active ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}
            >{fieldMap[index].player}</div>
          );
        })}
      </div> */}
    </div>
  );
}

export default GamePlay;
