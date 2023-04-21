import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const SettingsModal = ({ setModalOn, setChoice }) => {
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
    <div className="bg-zinc-200/75 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white opacity-100 py-6 px-6 border-4 w-90 lg:w-1/3 border-sky-500 rounded-xl">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Game Settings
          </h2>
          <div className="flex flex-col">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div className="w-80 mx-auto">
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="flags"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-gray-900"
                    >
                      Player Character
                    </label>
                    <div className="mt-2">
                      <input
                        id="flags"
                        name="flags"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="flags"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-gray-900"
                    >
                      AI Difficulty
                    </label>
                    <div className="mt-2">
                      <ul class="flex w-full gap-2.5 ">
                        <li>
                          <input
                            type="radio"
                            id="eazy"
                            name="players"
                            value="2-players"
                            class="hidden peer"
                            required
                          />
                          <label
                            for="2-players"
                            class="inline-flex items-center justify-between w-full px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-green-800 dark:hover:bg-green-700"
                          >
                            <div class="block">
                              <div class="w-full text-sm text-center font-semibold">
                                Eazy
                              </div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="medium"
                            name="players"
                            value="2-players"
                            class="hidden peer"
                            required
                          />
                          <label
                            for="2-players"
                            class="inline-flex items-center justify-between w-full px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-blue-800 dark:hover:bg-blue-700"
                          >
                            <div class="block">
                              <div class="w-full text-sm text-center font-semibold">
                                Med
                              </div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="hard"
                            name="players"
                            value="3-players"
                            class="hidden peer"
                          />
                          <label
                            for="3-players"
                            class="inline-flex items-center justify-between w-full px-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-red-800 dark:hover:bg-red-700"
                          >
                            <div class="block">
                              <div class="w-full text-sm text-center font-semibold">
                                Hard
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end  items-center">
                    <label
                      htmlFor="field"
                      className="block text-sm text-right mr-6 font-medium leading-6 text-gray-900"
                    >
                      Number of Flags
                    </label>
                    <div className="mt-2">
                      <input
                        id="field"
                        name="field"
                        type="text"
                        required
                        className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center ">
                    <label
                      htmlFor="ai"
                      className="block text-sm text-right mr-8 font-medium leading-6 text-gray-900"
                    >
                      Clear High Scores
                    </label>

                    <div className="mt-2">
                      <ul class="flex w-full gap-8 ">
                        <li>
                          <input
                            type="radio"
                            id="hard"
                            name="players"
                            value="3-players"
                            class="hidden peer"
                          />
                          <label class="inline-flex items-center justify-between w-full px-16 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-red-800 dark:hover:bg-red-700">
                            <div class="block">
                              <div class="w-full text-lg text-center font-semibold">
                                Yes
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-10 mt-10">
                    <button
                      onClick={handleCancelClick}
                      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Cancel
                    </button>
                    <Link
                      to={"/"}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            {/* <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 text-white bg-green-400"
            >
              Yes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
