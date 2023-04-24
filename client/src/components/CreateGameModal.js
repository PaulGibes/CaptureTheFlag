import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { UPDATE_ISHOST } from "../utils/mutations";
import { JOIN_QUEUE, CREATE_GAME } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/modules.css";
import { motion, AnimatePresence } from "framer-motion";

const CreateGameModal = ({ setModalOn, setChoice }) => {
  const [updateHost] = useMutation(UPDATE_ISHOST);
  const [updateQueue] = useMutation(JOIN_QUEUE);
  const [createGame] = useMutation(CREATE_GAME);

  const [flagsToWin, setFlags] = useState(1);
  const [teamPlayers, setPlayers] = useState(2);
  const [difficulty, setDifficulty] = useState("easy");

  const handleFlagsChange = (e) => {
    setFlags(e.target.value);
  };

  const handlePlayersChange = (e) => {
    setPlayers(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  const currentUser = Auth.getUsername();
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { username: currentUser },
  });
  // console.log(data)
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const userId = data.user._id;

  const HandleJoinQueue = async (username, userId, flagsToWin, teamPlayers, difficulty) => {
    // console.log(Number(flagsToWin))
    // console.log(Number(teamPlayers))
    // console.log(difficulty)
    flagsToWin = Number(flagsToWin);
    teamPlayers = Number(teamPlayers);
    let gameId = "";

    try {
      const { data } = await createGame({
        variables: { username, teamOne: userId, flagsToWin, teamPlayers, difficulty },
      });
      // console.log(data)
      gameId = data.createGame._id;
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await updateHost({
        variables: {
          username: username,
          isHost: true,
        },
      });
      // console.log(data)
    } catch (error) {
      console.error(error);
    }

    try {
      const { data } = await updateQueue({
        variables: {
          userId: userId
        },
      });
      console.log(data)
    } catch (error) {
      console.error(error);
    }

    window.location.href = "/waitingroom?game=" + gameId;
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
                      htmlFor="flagsToWin"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      FLAGS TO WIN (1-10)
                    </label>
                    <div className="mt-2">
                      <input
                        id="flagsToWin"
                        name="flagsToWin"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border p-0 sm:py-1.5 text-white bg-transparent border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        value={flagsToWin}
                        onChange={handleFlagsChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="flagsToWin"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-white"
                    >
                      TEAM PLAYERS
                    </label>
                    <div className="mt-2">
                      <ul className="flex w-full gap-6 ">
                        <li>
                          <input
                            type="radio"
                            id="2-players"
                            name="teamPlayers"
                            value={teamPlayers}
                            className="hidden peer"
                            onChange={handlePlayersChange}
                            required
                          />
                          <label className="inline-flex items-center justify-between w-full px-8 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  ">
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
                            name="teamPlayers"
                            value={teamPlayers}
                            className="hidden peer"
                            onChange={handlePlayersChange}
                          />
                          <label className="inline-flex items-center justify-between w-full px-8 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  ">
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
                  <div className="flex justify-end items-center ">
                    <label className="block text-sm text-right mr-6 font-medium leading-6 text-white">
                      DIFFICULTY
                    </label>
                    <div className="mt-2">
                      <ul className="flex w-full gap-6 ">
                        <li>
                          <input
                            type="radio"
                            id="easy"
                            name="difficulty"
                            value="easy"
                            className="hidden peer"
                            required
                            onChange={handleDifficultyChange}
                          />
                          <label className="inline-flex items-center justify-between w-full px-6 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  ">
                            <div className="block">
                              <div className="w-full text-lg text-center font-semibold">
                                Easy
                              </div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="hard"
                            name="difficulty"
                            value="hard"
                            className="hidden peer"
                            onChange={handleDifficultyChange}
                          />
                          <label className="inline-flex items-center justify-between w-full px-6 text-white  border  border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 rounded-md cursor-pointer peer-checked:bg-orange-500 peer-checked:text-white hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 btn-outsider  ">
                            <div className="block">
                              <div className="w-full text-lg text-center font-semibold">
                                Hard
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-10 mt-10">
                    <Link
                      onClick={() => HandleJoinQueue(data.user.username, data.user._id, flagsToWin, teamPlayers, difficulty)}
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
