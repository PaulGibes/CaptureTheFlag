import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import "../styles/modules.css";
import { motion, AnimatePresence } from "framer-motion";

const CreateGameModal = ({ setModalOn, setChoice }) => {
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: { delay: 0.2 },
    },
  };

  return (
    // fixed and inset-0 makes it expand to the entire screen. Opacity is what is behind it loses focus. A high z-index insures the modal will be on top
    <div
      className="bg-modal fixed inset-0 z-50"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <div className="flex h-screen justify-center items-center">
        <motion.div
          className="flex-col justify-center bg-modal-create opacity-100 w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5 h-3/5  "
          variants={modal}
        >
          <button
            onClick={handleCancelClick}
            className=" text-gray-500 mt-10 float-right pr-20 hover:text-orange-500 "
          >
            Cancel X
            {/* absolute top-5 right-20 sm:right-24 md:right-32 lg:right-28 */}
          </button>
          <h2 className="mt-10 clear-both text-center text-2xl tracking-tight text-white">
            CREATE GAME
          </h2>
          <div className="flex flex-col  mx-auto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-4" action="#" method="POST">
                <div className="w-80 mx-auto">
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="flags"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      FLAGS TO WIN
                    </label>
                    <div className="mt-2">
                      <input
                        id="flags"
                        name="flags"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border p-0 sm:py-1.5 text-white bg-transparent border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="flags"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      TEAM PLAYERS
                    </label>
                    <div className="mt-2">
                      <ul class="flex w-full gap-6 ">
                        <li>
                          <input
                            type="radio"
                            id="2-players"
                            name="players"
                            value="2-players"
                            class="hidden peer"
                            required
                          />
                          <label
                            for="2-players"
                            className="inline-flex items-center justify-between w-full px-8 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  "
                          >
                            <div className="block">
                              <div className="w-full text-lg text-center font-semibold">
                                2
                              </div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="3-players"
                            name="players"
                            value="3-players"
                            class="hidden peer"
                          />
                          <label
                            for="3-players"
                            className="inline-flex items-center justify-between w-full px-8 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  "
                          >
                            <div className="block">
                              <div className="w-full text-lg text-center font-semibold">
                                3
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end  items-center">
                    <label
                      htmlFor="field"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      BOARD SIZE
                    </label>
                    <div className="mt-2">
                      <input
                        id="field"
                        name="field"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border p-0 sm:py-1.5 text-white bg-transparent border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="ai"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      AI LEVEL
                    </label>
                    <div className="mt-2">
                      <input
                        id="ai"
                        name="ai"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border  p-0 sm:py-1.5 text-white bg-transparent border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 mt-10">
                    <Link
                      to={"/waitingroom"}
                      className="btn btn-block btn-outsider flex w-full justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white  border border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                      style={{ cursor: "pointer" }}
                    >
                      GO TO QUEUE
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            {/* <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 text-white bg-green-400"
            >
              Yes
            </button> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateGameModal;
