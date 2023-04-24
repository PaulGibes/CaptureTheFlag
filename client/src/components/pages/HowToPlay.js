import React from "react";
import "../../styles/globals.css";
import { Modal, Carousel, Button } from "flowbite-react";
import { useState } from "react";
import img1 from "../../assets/images/1.jpg";
import { motion, AnimatePresence } from "framer-motion";

function HowToPlay() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
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
      <React.Fragment>
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
          <Modal show={showModal} onClose={onClose} size="3xl" >
            <Modal.Header className="bg-orange-500">How To Play</Modal.Header>
            <Modal.Body className="bg-transparent">
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
      </React.Fragment>
    </>
  );
}

export default HowToPlay;
