import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";

const HowToPlayModal = ({ setModalOn, setChoice }) => {
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  return (
    // fixed and inset-0 makes it expand to the entire screen. Opacity is what is behind it loses focus. A high z-index insures the modal will be on top
    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-6 px-6 border-4 w-1/2 h-3/4 border-sky-500 rounded-xl">
          <h1 className="flex justify-center mb-5">How To Play!</h1>
          <div className="flex flex-col">
            <div className="mx-auto">
              <img
                src={img1}
                alt="How To Play Img 1"
                className="object-fill  border-2 border-sky-500"
                // object-fill w-full h-full
              ></img>
            </div>
            <p>Lorem Epsum</p>
            <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 text-white bg-green-400"
            >
              Yes
            </button>
            <button
              onClick={handleCancelClick}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
