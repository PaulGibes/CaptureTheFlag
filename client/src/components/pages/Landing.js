import React from "react";
import "../../styles/globals.css";
import { Modal, Carousel, Button } from 'flowbite-react'
import { useState } from "react";
import img1 from "../../assets/images/1.jpg"

function Landing() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <React.Fragment>
        <div className="flex justify-center">
          <Button onClick={onClick}>
            How To Play
          </Button>
        </div>
        <Modal
          show={showModal} onClose={onClose} size="3xl"
        >
          <Modal.Header>
            How To Play
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">

              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slide={false}>
                  <img
                    src={img1}
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

            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-center">
            <Button onClick={onClose}>
              I'm ready to play!
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>

    </>
  );
}

export default Landing;
