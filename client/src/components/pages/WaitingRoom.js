import React from "react";
import "../../styles/globals.css";
import { motion } from "framer-motion";
import Auth from "../../utils/auth";
import { QUERY_SINGLE_USER } from "../../utils/queries";
import { EXIT_QUEUE } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../../styles/home.css";
import { mapFooter } from "../../assets/images";

function WaitingRoom() {
    // first grabbing current user from local storage (auth.js)
    const currentUser = Auth.getUsername();
    // useQuery uses useState and setState internally
    // passing QUERY_SINGLE_USER GQL function to useQuery and passing an argument of currentUser
    const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: currentUser },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const ballStyle = {
        width: "5rem",
        height: "5rem",
        margin: "2rem",
        borderRadius: "50%",

    };

    const getRandomDuration = () => {
        return Math.random() * 0.4 + 0.2;
    };

    const getRandomColor = () => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    const balls = Array.from({ length: getRandomNumber() }).map(() => {
        return {
            duration: getRandomDuration(),
            color: getRandomColor(),
        };
    });

    const HandleExitQueue = async (username) => {
        try {
            const result = await useMutation({
                mutation: EXIT_QUEUE,
                variables: {
                    username: username
                }
            });

        } catch (error) {
            console.error(error);
        }
        window.location.href = "/choose-game";
    };

    const HandleCreateGame = async () => {
        // i want to query for an array of users in the queue array
        // i want to use the createGame mutation to create a game
        // i want to use the fillGame mutation to fill the game with up to 6 players or bots
        window.location.href = "/choose-game";
    }

    return (
        <>
            <section className="min-h-screen">
                <div className="mt-20">
                    <div className="w-80 mx-auto px-10 md:pt-10 md:mx-10">
                        <button onClick={() => HandleExitQueue(data.user.username)}
                            className="btn btn-block btn-outsider mx-auto sm:mx-10 flex w-40 justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white shadow-sm  border border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  "
                            style={{ cursor: "pointer" }}
                        >
                            Leave Lobby
                        </button>
                        {data.user.isHost ? <div>
                            <button onClick={() => HandleCreateGame()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded">Start Game</button>
                        </div> : ""}
                    </div>
                    <h2 className="text-2xl text-center accent p-10">
                        Get ready to Capture the Flag!
                    </h2>
                </div>
                <div className="text-center flex md:gap-10 lg:gap-30 justify-center items-center ">
                    <div className=" ">
                        <p className="text-2xl md:text-5xl p-4 mt-8 text-white">The Outsiders</p>
                    </div>
                    <div className=" ">
                        <p className="text-5xl md:text-9xl font-bold accent p-4">VS</p>
                    </div>
                    <div className="flex flex-col  justify-center ">
                        <p className="text-2xl md:text-5xl p-4 mt-8 my-5 text-white">The Insiders</p>
                    </div>
                </div>
                <div className="flex justify-evenly">
                    {data.user.isHost ? (
                        <div className="flex">
                            <motion.div
                                //   onClick={clicked}
                                className="bg-btn hover:bg-btn-h cursor-pointer justify-center w-1/3 h-20 mx-auto p-2 z-10  text-white text-center"
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <div className="mt-1 sm:mt-4 md:text-xl">START GAME</div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.p
                            animate={{ opacity: 0.4 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2,
                            }}
                            className="text-white"
                        >
                            {" "}
                            Waiting for the host to start the game...
                        </motion.p>
                    )}
                </div>

                <div className="flex justify-center">
                    {balls.map((ball, index) => (
                        <div
                            key={index}
                            style={{
                                margin: "5rem",
                                width: "100vw",
                                height: "10vh",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <motion.span
                                style={{
                                    ...ballStyle,
                                    backgroundColor: ball.color,
                                }}
                                transition={{
                                    y: {
                                        duration: ball.duration,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeOut",
                                    },
                                }}
                                animate={{
                                    y: ["100%", "-100%"],
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="w-full overflow-hidden flex justify-center">
                    <img className=" mx-auto w-[200rem] max-w-none" src={mapFooter} />
                </div>
            </section>
        </>
    );
}

export default WaitingRoom;
