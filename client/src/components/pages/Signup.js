import React from "react";
import { useState } from "react";
import Button from "../Button";
import LoginModal from "../LoginModal";
import Logo from "../../assets/images/capturetheflag.jpg";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //set the form state equal to itself and then add the value to the name of the target(username or password)
    setFormState({
      ...formState,
      [name]: value,
    });
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
    } catch (err) {
      console.log(err);
    }
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
        <form className="space-y-6" action="#" method="POST">
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
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="character"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Choose your Character
            </label>
            <fieldset className=" gap-10">
              <input
                id="character1"
                className="peer/1"
                type="radio"
                name="status"
                checked
              />
              <label
                for="character1"
                className="peer-checked/character1:text-sky-500"
              >
                Character 1
              </label>

              <input
                id="character2"
                className="peer/2"
                type="radio"
                name="status"
              />
              <label
                for="character2"
                className="peer-checked/character2:text-sky-500"
              >
                Character 2
              </label>
              <input
                id="character3"
                className="peer/3"
                type="radio"
                name="status"
              />
              <label
                or="character3"
                className="peer-checked/character3:text-sky-500"
              >
                Character 3
              </label>

              <br />
              <div className="hidden peer-checked/1:block flex-1 ">
                This is awesome!
              </div>
              <div className="hidden peer-checked/2:block">Lets Go!</div>
              <div className="hidden peer-checked/3:block">Are you ready?!</div>
            </fieldset>
          </div>

          <div>
            <Button type="submit" href="/choose-game">
              Create New Player
            </Button>
          </div>
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
