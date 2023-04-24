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
          <HowToPlay className="mt-5 z-10" />
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
