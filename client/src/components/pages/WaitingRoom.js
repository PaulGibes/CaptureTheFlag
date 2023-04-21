import React, { useState } from "react";
import "../../styles/globals.css";
import { motion } from "framer-motion";
import Auth from "../../utils/auth"
import { QUERY_SINGLE_USER } from "../../utils/queries"
import { useQuery } from "@apollo/client";

function WaitingRoom() {
    // first grabbing current user from local storage (auth.js)
    const currentUser = Auth.getUsername()
    console.log(currentUser)
    // passing QUERY_SINGLE_USER GQL function to useQuery and passing an argument of currentUser
    const { data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: currentUser }
    })
    console.log(data)

    // change initial value for fun
    const [numUsers, setNumUsers] = useState(1);

    const ballStyle = {
        width: "5rem",
        height: "5rem",
        margin: "2rem",
        borderRadius: "50%",
    };

    const getRandomDuration = () => {
        return Math.random() * 0.4 + 0.2;
    };

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const balls = Array.from({ length: numUsers }).map(() => {
        return {
            duration: getRandomDuration(),
            color: getRandomColor(),
        };
    });

    const gameMode = 1
    let opponent = ""
    if (gameMode === 1) {
        opponent = "The Insiders"
    } else {
        opponent = "The Machines"
    }

    return (
        <>
            <div className="flex justify-evenly">
                <p className="text-5xl p-4 mt-8">The Outsiders</p>
                <p className="text-9xl p-4">VS</p>
                <p className="text-5xl p-4 mt-8">{opponent}</p>
            </div>
            <div className="flex justify-evenly">
                <button className="bg-blue-500 hover:bg-blue-700 text-white max-h-[3rem] font-bold px-4 rounded">Leave Game</button>
                <p className="text-2xl text-center p-10">Get ready to Capture the Flag!</p>

                <button className="bg-blue-500 hover:bg-blue-700 text-white max-h-[3rem] font-bold px-4 rounded">Start Game</button>

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
        </>
    );
}

export default WaitingRoom;
