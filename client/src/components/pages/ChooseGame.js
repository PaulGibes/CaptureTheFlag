import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Auth from "../../utils/auth"
import { QUERY_SINGLE_USER } from "../../utils/queries"
import { JOIN_QUEUE } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import CreateAIGameModal from "../CreateAIGameModal";
import "../../styles/home.css";
import { mapFooter } from "../../assets/images";

function ChooseGame() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [AImodalOn, setAIModalOn] = useState(false);
  const [choice, setChoice] = useState(false);
  const [updateQueue] = useMutation(JOIN_QUEUE);


  const currentUser = Auth.getUsername()
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { username: currentUser }
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(data)

  const HandleJoinQueue = async (username) => {
    try {
      const { data: { updateQueue } } = await updateQueue({
        variables: {
          username: username
        },
      });
      console.log(updateQueue)
    } catch (error) {
      console.error(error);
    }
    window.location.href = "/waitingroom";
  };

  const clicked = () => {
    setModalOn(true);
  };

  const clickedAI = () => {
    setAIModalOn(true);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="  ">
        <section className="min-h-screen">
          <div className="text-center flex gap-10 lg:gap-40 justify-center items-center mt-32">
            <div className="w-52">
              <p className="my-5 text-white">Play with the machine</p>
              <motion.div
                onClick={clickedAI}
                className="bg-btn hover:bg-btn-h cursor-pointer flex items-center justify-center w-full h-20 mx-auto p-2 z-10  text-white text-center"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="  md:text-xl">QUICKSTART</div>
              </motion.div>
            </div>
            <div className="after:block after:bg-gray-600 after:w-[1px] after:h-64 after:mx-auto after:my-2"></div>
            <div className="flex flex-col  justify-center py-10">
              <div onClick={() => HandleJoinQueue(data.user.username)} className=" ">
                <p className="my-5 text-white">Join an online game:</p>

                <motion.div
                  className="bg-btn hover:bg-btn-h cursor-pointer flex items-center justify-center w-full h-20 mx-auto p-2 z-10  text-white text-center"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="  md:text-xl">JOIN GAME</div>
                </motion.div>
              </div>
              <div className="w-52">
                <p className="my-5 text-white">Create a new online game:</p>

                <motion.div
                  onClick={clicked}
                  className="bg-btn hover:bg-btn-h cursor-pointer flex items-center justify-center w-full h-20 mx-auto p-2 z-10  text-white text-center"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="  md:text-xl">CREATE GAME</div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden flex justify-center">
            <img className=" mx-auto w-[200rem] max-w-none" src={mapFooter} />
          </div>
          {modalOn && (
            <CreateGameModal setModalOn={setModalOn} setChoice={setChoice} />
          )}
          {AImodalOn && (
            <CreateAIGameModal setAIModalOn={setAIModalOn} setChoice={setChoice} />
          )}
        </section>
      </div>
    </div>
  );
}

export default ChooseGame;
