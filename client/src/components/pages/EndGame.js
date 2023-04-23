import React from "react";
import "../../styles/globals.css";
import { AiOutlineFlag } from "react-icons/ai";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import HighscoreBoard from "../HighscoreBoard";
import { Link } from "react-router-dom";
import "../../styles/modules.css";
import { stars } from "../../assets/images";

function EndGame() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <section className="min-h-screen">
        <div className="absolute -top-[50%] z-0">
          <img src={stars} />
        </div>
        <div className="flex min-h-full flex-col justify-center items-center w-4/5 my-20 md:my-32 mx-auto">
          <div className="sm:mx-auto sm:w-full  z-10">
            <div className="text-start flex gap-10 lg:gap-40 justify-center items-center py-0 md:py-10">
              <div>
                <h2 className="text-5xl md:text-9xl accent my-5">WINNER</h2>
                <div>
                  <div className="flex items-center">
                    <AiOutlineFlag className="text-5xl mr-5 text-red-600" />
                    <h3 className="text-3xl md:text-5xl my-5 text-white">
                      The Outsiders
                    </h3>
                  </div>
                  <h4 className="text-5xl text-white my-5">
                    Score:<span className="font-bold accent">45</span>
                  </h4>
                </div>
                <Link
                  to={"/choose-game"}
                  className="btn btn-block btn-outsider flex w-full cursor-pointer justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white shadow-sm  border border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Play Again
                </Link>
              </div>
              <div className="flex flex-col w-[200px] md:w-[300px] justify-center py-10">
                <div className="skew-y-12">
                  <h3 className="my-5 text-white">Highscores Leaderboard</h3>
                  <div className="bg-modal-highscore2 p-[30px]">
                  <HighscoreBoard className="w-[300px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EndGame;
