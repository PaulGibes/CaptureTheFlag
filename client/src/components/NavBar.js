import React from "react";
import "../../src/styles/globals.css";
import { MdLogout } from "react-icons/md";
import SettingsModal from "../components/SettingsModal";
import { navbarGUI, iconSettings, iconHighscore } from "../assets/images";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Music from "../assets/sound/neon-gaming.mp3";

function NavBar() {
  // console.log("navbar");
  const [darkMode, setDarkMode] = useState(true);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);
  const clicked = () => {
    // console.log("nav bar state chnage");
    setModalOn(true);
  };

  const [user, setLoggedUser] = useState(
    []
    //const saved = localStorage.getItem("username");
    //const initialValue = JSON.parse(saved);
    //console.log(saved);

    //return saved || "";
  );

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLoggedUser(username);
      // console.log(username);
    } else {
      setLoggedUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const iconScale = {
    rest: { scale: 1, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };
  const textAnimate = {
    rest: {
      opacity: 1,
      x: 0,
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
    },
    hover: {
      opacity: 0.9,
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };
  const textAnimate2 = {
    rest: {
      opacity: 1,
      x: 0,
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
    },
    hover: {
      opacity: 0.9,
      x: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };
  const cornerBorder = {
    rest: { scale: 1, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  const navbar = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: { duration: 2, delay: 0.2, type: "ease-in" },
    },
  };

  const left = {
    hidden: {
      x: "-100vw",
      opacity: 0,
    },
    visible: {
      x: "0px",
      opacity: 1,
      transition: { duration: 2, delay: 0.2, type: "ease-in" },
    },
  };

  const right = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: "0px",
      opacity: 1,
      transition: { duration: 2, delay: 0.1, type: "ease-in" },
    },
  };

  // whileHover={{ scale: 1.2 }}
  //             whileTap={{ scale: 0.9 }}
  //             transition={{ type: "spring", stiffness: 400, damping: 17 }}

  return (
    <div className="">
      <audio autoplay="true" src={Music}></audio>
      <div className=" px-10 md:px-20 lg:px-40  ">
        <nav className="pb-10 mb-12">
          <motion.div
            variants={navbar}
            initial="hidden"
            animate="visible"
            className="text-center absolute z-10 w-90 mx-auto left-0 right-0 flex flex-col justify-center items-center"
          >
            <Link to={"/"}>
              <div className="w-full">
                <img src={navbarGUI} />
              </div>
            </Link>

            <h2
              className={
                user
                  ? "text-md absolute pb-5 text-white select-none font-medium md:text-4xl cursor-pointer "
                  : "text-md absolute pt-5 pb-5 text-white select-none font-medium md:text-4xl cursor-pointer"
              }
            >
              THE OUTSIDERS
            </h2>
            <div className="flex items-center">
              {user ? (
                <h3 className="text-1xl   md:text-2xl text-white">
                  Welcome {user}!
                </h3>
              ) : null}
              {user ? (
                <h1
                  className="text-md ml-2 cursor-pointer accent hover:text-orange-600"
                  onClick={handleLogout}
                >
                  <MdLogout />
                </h1>
              ) : null}
            </div>
          </motion.div>
          <Link to="/highscores">
            <motion.div
              className="flex items-center py-10 sm:pt-12 md:pt-16 absolute z-10  "
              variants={left}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <motion.div
                className=" w-8 h-8 md:w-10 md:h-10 mx-2 box box-e cursor-pointer"
                variants={cornerBorder}
              >
                <motion.div
                  className="w-7 h-7 md:w-9 md:h-9 bg-icon "
                  variants={iconScale}
                >
                  <img src={iconHighscore} />
                </motion.div>
              </motion.div>
              <motion.h2
                className="hidden sm:block text-md md:text-2xl text-white"
                variants={textAnimate}
              >
                High Scores
              </motion.h2>
            </motion.div>
          </Link>
          <div className=" ">
            <motion.div
              onClick={clicked}
              variants={right}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className=" flex items-center  cursor-pointer py-10 sm:pt-12 md:pt-16 relative z-10 pr-0 md:pr-10 float-right"
            >
              <motion.h2
                className="hidden sm:block text-md md:text-2xl text-white"
                variants={textAnimate2}
              >
                Settings
              </motion.h2>
              <motion.div
                className=" w-8 h-8 md:w-10 md:h-10 mx-2 box box-e cursor-pointer"
                variants={cornerBorder}
              >
                <motion.div
                  className="w-7 h-7 md:w-9 md:h-9 bg-icon "
                  variants={iconScale}
                >
                  <img src={iconSettings} />
                </motion.div>
              </motion.div>
            </motion.div>
            {modalOn && (
              <SettingsModal setModalOn={setModalOn} setChoice={setChoice} />
            )}

            {/* <BsFillMoonStarsFill
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer text-2xl dark:text-white"
              /> */}
          </div>
        </nav>
      </div>
    </div>
  );
}

function MyButton(props) {
  return (
    <a
      href={props.href}
      className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block"
    >
      {props.children}
    </a>
  );
}
export default NavBar;
