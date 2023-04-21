import React, { useEffect } from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import HighscoreBoard from "../HighscoreBoard";
import { Link } from "react-router-dom";

import MapLogic from "../../utils/mapLogic";

function GamePlay() {
  console.log("test");
  //let yellow = "#ffc800";
  const [roundCount, startNewRound] = useState(" ");

  const activeSpace = (id) => {
    //let indigo = "#000";

    // const row = parseInt(id.charAt(0));
    // const column = parseInt(id.substring(2, id.length));

    document.getElementById(id).style.backgroundColor = "indigo";
    
  };

  const doNothing = function(){

  };


  function startTimer(display) {
    var timer = 5;
    console.log("Timer started");
    var interval = setInterval(function () {
      document.getElementById("timer").textContent = "00:0" + timer;
      if (timer == 0) {
        clearInterval(interval);
        document.getElementById("1-" + Math.floor((Math.random() * 12) + 1)).style.backgroundColor = "indigo";
        startNewRound("");
      }
      timer--;
    }, 1000);
  }

  //startTimer();

  const fieldMap = [
    { id: '1-1', player: "", active: false, image: "", },
    { id: '1-2', player: "", active: false, image: "", },
    { id: '1-3', player: "", active: false, image: "", },
    { id: '1-4', player: "", active: true, image: "", },
    { id: '1-5', player: "", active: false, image: "", },
    { id: '1-6', player: "Bot3", active: false, image: "", },
    { id: '1-7', player: "", active: false, image: "", },
    { id: '1-8', player: "", active: false, image: "", },
    { id: '1-9', player: "", active: false, image: "", },
    { id: '1-10', player: "", active: false, image: "", },
    { id: '1-11', player: "", active: false, image: "", },
    { id: '1-12', player: "", active: false, image: "", },
    { id: '2-1', player: "", active: false, image: "", },
    { id: '2-2', player: "", active: false, image: "", },
    { id: '2-3', player: "", active: false, image: "", },
    { id: '2-4', player: "", active: false, image: "", },
    { id: '2-5', player: "", active: false, image: "", },
    { id: '2-6', player: "", active: false, image: "", },
    { id: '2-7', player: "Myself", active: false, image: "", },
    { id: '2-8', player: "", active: false, image: "", },
    { id: '2-9', player: "", active: false, image: "", },
    { id: '2-10', player: "", active: false, image: "", },
    { id: '2-11', player: "", active: false, image: "", },
    { id: '2-12', player: "", active: false, image: "", },
    { id: '3-1', player: "", active: false, image: "", },
    { id: '3-2', player: "", active: false, image: "", },
    { id: '3-3', player: "", active: false, image: "", },
    { id: '3-4', player: "", active: false, image: "", },
    { id: '3-5', player: "", active: false, image: "", },
    { id: '3-6', player: "", active: false, image: "", },
    { id: '3-7', player: "", active: false, image: "", },
    { id: '3-8', player: "", active: false, image: "", },
    { id: '3-9', player: "", active: false, image: "", },
    { id: '3-10', player: "", active: false, image: "", },
    { id: '3-11', player: "", active: false, image: "", },
    { id: '3-12', player: "", active: false, image: "", },
    { id: '4-1', player: "", active: false, image: "", },
    { id: '4-2', player: "Player2", active: false, image: "", },
    { id: '4-3', player: "", active: false, image: "", },
    { id: '4-4', player: "", active: false, image: "", },
    { id: '4-5', player: "", active: false, image: "", },
    { id: '4-6', player: "", active: false, image: "", },
    { id: '4-7', player: "", active: false, image: "", },
    { id: '4-8', player: "", active: false, image: "", },
    { id: '4-9', player: "", active: false, image: "", },
    { id: '4-10', player: "", active: false, image: "", },
    { id: '4-11', player: "", active: false, image: "", },
    { id: '4-12', player: "", active: false, image: "", },
    { id: '5-1', player: "", active: false, image: "", },
    { id: '5-2', player: "", active: false, image: "", },
    { id: '5-3', player: "", active: false, image: "", },
    { id: '5-4', player: "", active: false, image: "", },
    { id: '5-5', player: "Bot2", active: false, image: "", },
    { id: '5-6', player: "", active: false, image: "", },
    { id: '5-7', player: "", active: false, image: "", },
    { id: '5-8', player: "", active: false, image: "", },
    { id: '5-9', player: "", active: false, image: "", },
    { id: '5-10', player: "", active: false, image: "", },
    { id: '5-11', player: "", active: false, image: "", },
    { id: '5-12', player: "", active: false, image: "", },
  ];

  MapLogic.activatePossibleMoves(fieldMap);

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
            Timer<span id="timer" className="ml-2 font-bold">00:03</span>
          </h2>
        </div>
        <div className="flex">
          <h2 className="text-xl mr-2">The Machines</h2>
          <h2 className="text-xl">
            Score:<span className="font-bold ml-2">20</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 p-10 min-h-screen">
        {fieldMap.map((id, index) => {
          return (
            <div
              key={fieldMap[index].id}
              id={fieldMap[index].id}
              onClick={fieldMap[index].active ? () => activeSpace(fieldMap[index].id) : doNothing}
              className={"hover:bg-indigo-500 border-solid border-2 border-indigo-600 cursor-pointer min-h-[100px]"}
              style={fieldMap[index].active ? {backgroundColor: "yellow"} : {backgroundColor: "white"}}
            >{fieldMap[index].player}</div>
          );
        })}
      </div>
    </div>
  );
}

export default GamePlay;
