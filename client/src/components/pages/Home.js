import React from "react";
import "../../styles/globals.css";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/home.css";
import LoginModal from "../LoginModal";
import HowToPlay from "./HowToPlay";
import { terrain, stars } from "../../assets/images";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [modalOn2, setModalOn2] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };

  const clicked2 = () => {
    setModalOn2(true);
  };

  const map = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: { duration: 2, delay: 0.2, type: "ease-in" },
    },
  };

  const opacity = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 2, delay: 0.2, type: "ease-in" },
    },
  };

  return (
    <div className="bg-main">
      {/* <ParticlesBg className= "min-h-screen" type="square" bg={true} /> */}
      <motion.div
        variants={opacity}
        initial="hidden"
        animate="visible"
        className="absolute -top-[50%] z-0"
      >
        <img src={stars} />
      </motion.div>
      <div className=" dark:bg-gray-900">
        <section className="min-h-screen">
          <div className="flex flex-col px-10 py-10 md:px-20 lg:px-40 justify-center text-center clear-both">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white">
              THE OUTSIDERS
            </h1>
            <h3 className="text-3xl text-white accent">CAPTURE THE FLAG</h3>
          </div>
          <div className="flex">
            <motion.div
              onClick={clicked}
              className="bg-btn hover:bg-btn-h cursor-pointer flex items-center justify-center w-1/3 h-20 mx-auto p-2 z-10  text-white text-center"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="  md:text-xl">Log In to Play</div>
            </motion.div>
          </div>

          <div
            onClick={clicked2}
            className="cursor-pointer flex items-center justify-center w-1/3 h-20 mx-auto p-2 z-10  text-white text-center "
          >
            <h3 className="z-10">How to Play</h3>
          </div>

          <motion.div
            className="w-full"
            variants={map}
            initial="hidden"
            animate="visible"
          >
            <img className=" mx-auto" src={terrain} />
          </motion.div>

          {modalOn && (
            <LoginModal setModalOn={setModalOn} setChoice={setChoice} />
          )}
          {modalOn2 && (
            <HowToPlay setModalOn2={setModalOn2} setChoice={setChoice} />
          )}
        </section>
      </div>
    </div>
  );
}

// function MyButton(props) {
//   return (
//     <a
//       href={props.href}
//       className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block"
//     >
//       {props.children}
//     </a>
//   );
// }
export default Home;
