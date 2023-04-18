import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { useState } from "react";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          
          <div className="text-center p-10">
            <h2 className="text-4xl py-2 text-teal-400 font-medium md:text-6xl ">
              The Outsiders
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Capture the Flag WebGame
            </h3>

            <div className="flex gap-10 justify-center py-10">
              <Button href="/login"> Login to Play</Button>
            </div>
          </div>
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
