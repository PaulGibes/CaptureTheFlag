import React from "react";
import "../../styles/globals.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Auth from "../../utils/auth"
import { QUERY_SINGLE_USER } from "../../utils/queries"
import { JOIN_QUEUE } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "../Button";
import { useState } from "react";
import CreateGameModal from "../CreateGameModal";
import CreateAIGameModal from "../CreateAIGameModal";

function ChooseGame() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [AImodalOn, setAIModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const currentUser = Auth.getUsername()
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { username: currentUser }
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(data)

  const HandleJoinQueue = async (id) => {
    try {
      const result = await useMutation({
        mutation: JOIN_QUEUE,
        variables: {
          id: id
        }
      });

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
      <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen">
          <div className="text-center flex gap-10 lg:gap-40 justify-center items-center py-10">
            <div>
              <p className="my-5">Play with the machine</p>
              <div
                onClick={clickedAI}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Play vs AI
              </div>
            </div>
            <div className="after:block after:bg-black after:w-[1px] after:h-64 after:mx-auto after:my-2"></div>
            <div className="flex flex-col  justify-center py-10">
              <div onClick={() => HandleJoinQueue(data.user._id)}>
                <p className="my-5">Join an online game:</p>
                <Button> Join Game</Button>
              </div>
              <div className="">
                <p className="my-5">Create a new online game:</p>

                <div
                  onClick={clicked}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Game
                </div>
              </div>
            </div>
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
