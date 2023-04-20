import React, { useEffect } from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import HighscoreBoard from "../HighscoreBoard";
import { Link } from "react-router-dom";

function GamePlay() {
  //let yellow = "#ffc800";
  const [bgColor, setActiveMode] = useState(" ");

  const activeSpace = (id) => {
    //let indigo = "#000";
    setActiveMode(bgColor);
    var element = document.getElementById("0");
    var element1 = document.getElementById("1");
    var element2 = document.getElementById("12");
    var element3 = document.getElementById("13");
    element.style.backgroundColor = "indigo";
    element1.style.backgroundColor = bgColor;
    element2.style.backgroundColor = bgColor;
    element3.style.backgroundColor = bgColor;
  };

  // useEffect(() => {

  // }, [bgColor]);

  const ids = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5",
    "1-6",
    "1-7",
    "1-8",
    "1-9",
    "1-10",
    "1-11",
    "1-12",
    "2-1",
    "2-2",
    "2-3",
    "2-4",
    "2-5",
    "2-6",
    "2-7",
    "2-8",
    "2-9",
    "2-10",
    "2-11",
    "2-12",
    "3-1",
    "3-2",
    "3-3",
    "3-4",
    "3-5",
    "3-6",
    "3-7",
    "3-8",
    "3-9",
    "3-10",
    "3-11",
    "3-12",
    "4-1",
    "4-2",
    "4-3",
    "4-4",
    "4-5",
    "4-6",
    "4-7",
    "4-8",
    "4-9",
    "4-10",
    "4-11",
    "4-12",
    "5-1",
    "5-2",
    "5-3",
    "5-4",
    "5-5",
    "5-6",
    "5-7",
    "5-8",
    "5-9",
    "5-10",
    "5-11",
    "5-12",
  ];

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
            Timer<span className="ml-2 font-bold">00:03</span>
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
        {ids.map((id, index) => {
          return (
            <div
              id={id}
              onClick={activeSpace(id)}
              className=" hover:bg-indigo-500 border-solid border-2 border-indigo-600 cursor-pointer min-h-[100px]"
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default GamePlay;
