import React from "react";
import { useState } from "react";
import Button from "../Button";
import LoginModal from "../LoginModal";
import Logo from "../../assets/images/capturetheflag.jpg";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useLoginFormValidator } from "../../utils/useLoginFormValidator.js";
import "../../styles/modules.css";
import avatar1 from "../../assets/images/player-1.jpg";
import avatar2 from "../../assets/images/player-2.jpg";
import avatar3 from "../../assets/images/player-3.jpg";
import avatar4 from "../../assets/images/player-4.jpg";
import avatar5 from "../../assets/images/player-5.jpg";
import avatar6 from "../../assets/images/player-6.jpg";

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
  

  
  const handleImageVal = (e) =>{
  
   //const data = e.target.id
   const {name, value} = e.target
   const nextFormState = {
    ...formState,
    [name]: value,
  };
  setFormState(nextFormState);
   console.log(name)
    console.log(value)
  
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
console.log(name)
console.log(value)


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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto logo-style"
          src={Logo}
          alt="capture flag logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create new player
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Player name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                onBlur={onBlurField}
                className={
                  errors.username.dirty && errors.username.error
                    ? "formFieldError"
                    : "formField"
                }
                required
                //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                onBlur={onBlurField}
                autoComplete="current-password"
                required
                className={
                  errors.password.dirty && errors.password.error
                    ? "formFieldError"
                    : "formField"
                }
              />
              {errors.password.dirty && errors.password.error ? (
                <p className="formFieldErrorMessage">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col justify-end items-center" onClick={handleImageVal}>
            <label
              htmlFor="flags"
              className="block text-sm text-right mr-6 font-medium leading-6 text-gray-900"
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
                    class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-lg text-center font-semibold">
                        <img src={avatar1} />
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
                    class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-lg text-center font-semibold">
                        <img src={avatar2} />
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
                    class="inline-flex items-center justify-between w-full px-8 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="block">
                      <div class="w-full text-lg text-center font-semibold">
                        <img src={avatar3} />
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            <div>
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
            </div>
          </div>

          <button
            className="btn btn-block btn-info flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
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
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In to Play
          </a>
        </p>
        {modalOn && (
          <LoginModal setModalOn={setModalOn} setChoice={setChoice} />
        )}
      </div>
    </div>
  );
}

export default Signup;
