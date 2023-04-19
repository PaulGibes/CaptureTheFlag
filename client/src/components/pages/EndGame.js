import React from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import HighscoreBoard from "../HighscoreBoard"
import { Link } from "react-router-dom";

function EndGame() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <div className="text-start flex gap-10 lg:gap-40 justify-center items-center py-10">
            <div>
              <h2 className="text-9xl my-5">WINNER</h2>
              <div>
                <div className="flex items-center">
                  <AiOutlineFlag className="text-5xl mr-5" />
                  <h3 className="text-5xl my-5">The Outsiders</h3>
                </div>
                <h4 className="text-5xl my-5">
                  Score:<span className="font-bold">45</span>
                </h4>
              </div>
              <Link
                to={"/choose-game"}
                className="flex   justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Play Again
              </Link>
            </div>
            <div className="flex flex-col  justify-center py-10">
              <div className="">
                <h3 className="my-5">Highscores Leaderboard</h3>
                <HighscoreBoard/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EndGame;
