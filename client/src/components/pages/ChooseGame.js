import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { useState } from "react";
import CreateGameModal from "../CreateGameModal";

function ChooseGame() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <div className="text-center flex gap-10 lg:gap-40 justify-center items-center py-10">
            <div>
              <p className="my-5">Play with the machine</p>
              <div
                onClick={clicked}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Play vs AI
              </div>
            </div>
            <div className="after:block after:bg-black after:w-[1px] after:h-64 after:mx-auto after:my-2"></div>
            <div className="flex flex-col  justify-center py-10">
              <div className=" ">
                <p className="my-5">Join an online game:</p>
                <Button> Join Game</Button>
              </div>
              <div className="">
                <p className="my-5">Create a new online game:</p>

                <div
                  onClick={clicked}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Game
                </div>
              </div>
            </div>
          </div>
          {modalOn && (
            <CreateGameModal setModalOn={setModalOn} setChoice={setChoice} />
          )}
        </section>
      </div>
    </div>
  );
}

export default ChooseGame;
