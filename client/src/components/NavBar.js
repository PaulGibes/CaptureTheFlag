import React from "react";
import "../../src/styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";

import { useState } from "react";

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
       
          <nav className="py-10 mb-12">
            <ul className="flex items-center  justify-evenly">
            <li>
            <h1 className="text-xl font-chivo dark:text-white">Highscores</h1>
            </li>
              <li>
              <div className="text-center p-450">
            <h2 className="text-4xl py-1 text-teal-400 font-medium md:text-4xl ">
              The Outsiders
            </h2>
            <h3 className="text-1xl py-2 md:text-2xl dark:text-white">
              Capture the Flag WebGame
            </h3>
         
          </div>
          </li>

<li className="flex">
                <a
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md mr-8"
                  href="#"
                >
                  Settings
                </a>
              {/* </li> */}
              {/* <li> */}
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl dark:text-white"
                />
              </li>
            </ul>
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