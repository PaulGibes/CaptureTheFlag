import React from "react";
import "../../styles/globals.css";
import { Modal, Carousel, Button } from "flowbite-react";
import { useState } from "react";
import img1 from "../../assets/images/1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HowToPlay = ({ setModalOn2, setChoice }) => {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setModalOn2(false);
  };

  const handleCancelClick = () => {
    setChoice(false);
    setModalOn2(false);
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
    <>
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
              onClick={onClose}
              className=" text-gray-500 mt-10 float-right pr-20 hover:text-orange-500 "
            >
              Skip
              {/* absolute top-5 right-20 sm:right-24 md:right-32 lg:right-28 */}
            </button>
            <h2 className="mt-10 mb-5 clear-both text-center text-2xl tracking-tight text-white">
              HOW TO PLAY
            </h2>
            <div className="space-y-6">
              <div className=" h-64 w-5/6 mx-auto">
                <Carousel slide={false}>
                  <img src={img1} alt="..." />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                    alt="..."
                  />
                </Carousel>
              </div>
            </div>
            {/* <div className="flex gap-10 mt-10">
              <Link
                onClick={handleCancelClick}
                className="btn btn-block btn-outsider flex w-full justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white  border border-orange-500  shadow-sm ring-1 ring-inset ring-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                style={{ cursor: "pointer" }}
              >
                SAVE
              </Link>
            </div> */}
          </motion.div>
        </div>
      </div>
      {/* <React.Fragment>
        <div className="flex justify-center">
          <div
            className="text-white z-10 hover:text-orange-500 cursor-pointer"
            onClick={onClick}
          >
            How To Play
          </div>
        </div>
        <AnimatePresence mode="wait">
        <motion.div
          variants={modal}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          <Modal show={showModal} onClose={onClose} size="3xl">
            <Modal.Header>How To Play</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                  <Carousel slide={false}>
                    <img src={img1} alt="..." />
                    <img
                      src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                      alt="..."
                    />
                    <img
                      src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                      alt="..."
                    />
                    <img
                      src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                      alt="..."
                    />
                    <img
                      src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                      alt="..."
                    />
                  </Carousel>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-center">
              <Button onClick={onClose}>I'm ready to play!</Button>
            </Modal.Footer>
          </Modal>
        </motion.div>
        </AnimatePresence>
      </React.Fragment> */}
    </>
  );
};

export default HowToPlay;
