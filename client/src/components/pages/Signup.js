import React from "react";
import { useState } from "react";
import Button from "../Button";
import LoginModal from "../LoginModal";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useLoginFormValidator } from "../../utils/useLoginFormValidator.js";
import "../../styles/modules.css";
import {
  stars,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  char1,
  char2,
  char3,
} from "../../assets/images";

import { BiUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    image: "",
  });

  const { errors, validateForm, onBlurField } =
    useLoginFormValidator(formState);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const isValid = formState.username !== "";

  const handleImageVal = (e) => {
    //const data = e.target.id
    const { name, value } = e.target;
    const nextFormState = {
      ...formState,
      [name]: value,
    };
    setFormState(nextFormState);
    console.log(name);
    console.log(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    //set the form state equal to itself and then add the value to the name of the target(username or password)
    const nextFormState = {
      ...formState,
      [name]: value,
    };
    setFormState(nextFormState);
    console.log(errors[name]);
    if (errors[name].dirty)
      validateForm({
        formState: nextFormState,
        errors,
        name,
      });
    console.log(formState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        //uses the ADD_USER mutation to create new user with values equal to formState
        variables: { ...formState },
      });
      //Takes the token returned by the server and sets it into local storage.
      Auth.login(data.addUser.token);
      console.log("user created");
    } catch (err) {
      console.log(err);
      const { isValid } = validateForm({
        formState,
        errors,
        forceTouchErrors: true,
      });
      if (!isValid) return;
    }

    setFormState({
      username: "",
      password: "",
      image: "",
    });
  };

  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };
  //Part of the return should be a ternary operator for if data is returned from the addUser function then provide a link back to the homepage and if not then show the signup form.

  return (
    <div>
      <section className="min-h-screen">
        <div className="absolute -top-[50%] z-0">
          <img src={stars} />
        </div>
        <div className="flex min-h-full flex-col justify-center items-center w-4/5 my-20 md:my-32 mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
          className="mx-auto logo-style"
          src={Logo}
          alt="capture flag logo"
        /> */}
            <h2 className="mt-10 text-center text-xl   text-white">
              Create new player
            </h2>
          </div>

          <div className="mt-10 z-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6 " onSubmit={handleFormSubmit}>
              <div>
                {/* <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-white"
            >
              Player name
            </label> */}
                <div className="">
                  <label
                    htmlFor="name"
                    class="relative text-orange-500 focus-within:text-orange-600 block"
                  >
                    {/* <BiUser className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}

                    <input
                      id="name"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      onBlur={onBlurField}
                      placeholder="Player Name"
                      className={
                        errors.username.dirty && errors.username.error
                          ? "formFieldError form-input text-center border border-gray-900 py-2 px-4  placeholder-gray-400 text-orange-500 appearance-none w-full block text-2xl focus:outline-none"
                          : "formField player form-input text-center border border-gray-900 py-2 px-4  placeholder-gray-400 text-orange-500 appearance-none w-full block text-2xl focus:outline-none"
                      }
                      required
                      //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </label>
                  {errors.username.dirty && errors.username.error ? (
                    <p className="formFieldErrorMessage">
                      {errors.username.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    class="relative text-orange-500 focus-within:text-orange-600 block"
                  >
                    <RiLockPasswordFill className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      onBlur={onBlurField}
                      autoComplete="current-password"
                      className={
                        errors.password.dirty && errors.password.error
                          ? "formFieldError form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 tracking-[.5em] focus:outline-none"
                          : "formField form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 tracking-[.5em] focus:outline-none"
                      }
                    />
                  </label>
                  {errors.password.dirty && errors.password.error ? (
                    <p className="formFieldErrorMessage">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div
                className="flex flex-col justify-end items-center"
                onClick={handleImageVal}
              >
                <label
                  htmlFor="flags"
                  className="block text-sm text-right font-medium leading-6 text-white"
                >
                  Choose a Character
                </label>
                <div className="mt-2">
                  <ul class="flex w-full gap-6 ">
                    <li>
                      <input
                        type="radio"
                        id="avatar-1"
                        name="image"
                        value="avatar-1"
                        class="hidden peer"
                        required
                      />
                      <label
                        for="avatar-1"
                        className="inline-flex items-center justify-between w-full   text-white  border-0  opacity-60 rounded-lg cursor-pointer peer-checked:opacity-100 peer-checked:text-orange-500  hover:opacity-100  "
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={char1} />
                          </div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="avatar-2"
                        name="image"
                        value="avatar-2"
                        class="hidden peer"
                      />
                      <label
                        for="avatar-2"
                        className="inline-flex items-center justify-between w-full   text-white  border-0 opacity-60  rounded-lg cursor-pointer peer-checked:opacity-100 peer-checked:text-orange-500  hover:opacity-100    "
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={char2} />
                          </div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="avatar-3"
                        name="image"
                        value="avatar-3"
                        class="hidden peer"
                      />
                      <label
                        for="avatar-3"
                        className="inline-flex items-center justify-between w-full   text-white  border-0  opacity-60  rounded-lg cursor-pointer peer-checked:opacity-100 peer-checked:text-orange-500 hover:opacity-100   "
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={char3} />
                          </div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </div>
                {/* <div>
                  <ul class="flex w-full gap-6 ">
                    <li>
                      <input
                        type="radio"
                        id="avatar-4"
                        name="image"
                        value="avatar-4"
                        class="hidden peer"
                        required
                      />
                      <label
                        for="avatar-4"
                        class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={avatar4} />
                          </div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="avatar-5"
                        name="image"
                        value="avatar-5"
                        class="hidden peer"
                      />
                      <label
                        for="avatar-5"
                        class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={avatar5} />
                          </div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="avatar-6"
                        name="image"
                        value="avatar-6"
                        class="hidden peer"
                      />
                      <label
                        for="avatar-6"
                        class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div class="block">
                          <div class="w-full text-lg text-center font-semibold">
                            <img src={avatar6} />
                          </div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </div> */}
              </div>

              <button
                className="btn btn-block btn-outsider flex w-full justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white shadow-sm  border border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Create Player
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a player?{" "}
              <a
                onClick={clicked}
                className="font-semibold leading-6 accent hover:text-orange-600 cursor-pointer"
              >
                Log In to Play
              </a>
            </p>
            {modalOn && (
              <LoginModal setModalOn={setModalOn} setChoice={setChoice} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
