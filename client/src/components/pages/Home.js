import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { useState } from "react";
import LoginModal from "../LoginModal";

function Home() {
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
          <div className="flex flex-col justify-center text-center p-10">
            <h2 className="text-4xl py-2 text-teal-400 font-medium md:text-6xl ">
              The Outsiders
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Capture the Flag WebGame
            </h3>
            <div
              onClick={clicked}
              className="  cursor-pointer justify-center w-1/3 mx-auto bg-blue-400 p-4 m-6 rounded-md text-white"
            >
              Log In to Play
            </div>
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
