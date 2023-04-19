import React from "react";
import "../../styles/globals.css";
import { Modal, Carousel, Button } from 'flowbite-react'
import { useState } from "react";

function Landing() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={onClick}>
        How To Play
      </Button>
      <Modal
        show={showModal} onClose={onClose}
      >
        <Modal.Header>
          Terms of Service
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">

            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel>
                <img
                  src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                  alt="..."
                />
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

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClick}>
            I accept
          </Button>
          <Button
            color="gray"
            onClick={onClick}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Landing;
