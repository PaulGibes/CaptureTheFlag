import React from "react";
import "../../styles/globals.css";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/home.css";
import LoginModal from "../LoginModal";
import { terrain, stars } from "../../assets/images";
import HighscoreBoard from "../HighscoreBoard";

function Highscores() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };
  return (
    <div className="bg-main">
      {/* <ParticlesBg className= "min-h-screen" type="square" bg={true} /> */}
      <div className="absolute -top-[50%] z-0">
        <img src={stars} />
      </div>
      <div className=" dark:bg-gray-900">
        <section className="min-h-screen">
          <div className="flex flex-col md:w-2/3 px-10 items-center md:mt-40 mx-auto highscore-board justify-center text-center clear-both">
            <div className="bg-modal-highscore w-full p-[30px]">
              <HighscoreBoard />
            </div>
          </div>
          <div className="w-full">
            <img className=" mx-auto" src={terrain} />
          </div>

          {modalOn && (
            <LoginModal setModalOn={setModalOn} setChoice={setChoice} />
          )}
        </section>
      </div>
    </div>
  );
}

export default Highscores;
