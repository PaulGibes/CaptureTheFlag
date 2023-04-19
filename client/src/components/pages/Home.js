import React from "react";
import "../../styles/globals.css";
import ParticlesBg from 'particles-bg';
import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { useState } from "react";
import LoginModal from "../LoginModal";
import Logo from "../../assets/images/capturetheflag.jpg";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };
  return (
    
    <div className={darkMode ? "dark" : ""}>
      <ParticlesBg className= "min-h-screen" type="square" bg={true} />
      <div className="px-10 md:px-20 lg:px-40 dark:bg-gray-900">
      
        <section className="min-h-screen">
          <img
          className="mx-auto logo-style"
          src={Logo}
          alt="capture flag logo"
        />
          <div
              onClick={clicked}
              className="  cursor-pointer justify-center w-1/3 mx-auto bg-blue-400 p-4 m-6 rounded-md text-white text-center"
            >
              Log In to Play
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
