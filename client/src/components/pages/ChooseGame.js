import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { useState } from "react";

function ChooseGame() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
           
          <div className="text-center flex gap-40 justify-center items-center py-10">
            <div >
              <p className="my-5">Play with the machine</p>
              <Button> Play Vs AI</Button>
            </div>
            <div className="after:block after:bg-black after:w-[1px] after:h-64 after:mx-auto after:my-2"></div>
            <div className="flex flex-col  justify-center py-10">
              <div className=" ">
                <p className="my-5">Join an online game:</p>
                <Button> Join Game</Button>
              </div>
              <div className="">
                <p className="my-5">Create a new online game:</p>
                <Button> Create Game</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChooseGame;
