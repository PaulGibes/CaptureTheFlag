import React from "react";
import "../../styles/globals.css";
import { motion } from "framer-motion";
import Auth from "../../utils/auth"
import { QUERY_SINGLE_USER } from "../../utils/queries"
import { useQuery } from "@apollo/client";

function WaitingRoom() {
    // first grabbing current user from local storage (auth.js)
    const currentUser = Auth.getUsername()
    // console.log(currentUser)
    // passing QUERY_SINGLE_USER GQL function to useQuery and passing an argument of currentUser
    const { data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: currentUser }
    })

    console.log(data.user.isHost)

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
    }

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 6) + 1
    }

    const balls = Array.from({ length: getRandomNumber() }).map(() => {
        return {
            duration: getRandomDuration(),
            color: getRandomColor(),
        };
    });

    return (
        <>
            <div className="flex justify-evenly">
                <p className="text-5xl p-4 mt-8">The Outsiders</p>
                <p className="text-9xl p-4">VS</p>
                <p className="text-5xl p-4 mt-8">The Insiders</p>
            </div>
            <p className="text-2xl text-center p-10">Get ready to Capture the Flag!</p>
            <div className="flex justify-evenly">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded">Leave Game</button>
                {data.user.isHost && (
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded">Start Game</button>
                    </div>
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
        </>
    );
}

export default WaitingRoom;
