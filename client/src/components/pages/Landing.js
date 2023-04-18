import React from "react";
import "../../styles/globals.css";
import HowToPlayModal from "../../modal";
import { useState } from "react";

// const styles = {
//   //   card: {
//   //     margin: 20,
//   //     background: "#e8eaf6",
//   //   },
//   //   heading: {
//   //     background: "#3f51b5",
//   //     minHeight: 50,
//   //     lineHeight: 3.5,
//   //     fontSize: "1.2rem",
//   //     color: "white",
//   //     padding: "0 20px",
//   //   },
//   //   content: {
//   //     padding: 20,
//   //   },
// };

function Landing() {
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          onClick={clicked}
          className="flex cursor-pointer justify-center w-1/3 bg-blue-400 p-4 m-6 rounded-md text-white"
        >
          How to Play
        </div>
        {modalOn && (
          <HowToPlayModal setModalOn={setModalOn} setChoice={setChoice} />
        )}
      </div>
    </>
  );
}

export default Landing;
