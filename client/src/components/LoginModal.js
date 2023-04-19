import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoginModal = ({ setModalOn, setChoice }) => {
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      //Set the value of the token in local storage to the token received.
      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // fixed and inset-0 makes it expand to the entire screen. Opacity is what is behind it loses focus. A high z-index insures the modal will be on top
    <div className="bg-zinc-200/75 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white opacity-100 py-6 px-6 border-4 w-1/3 border-sky-500 rounded-xl">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to play!
          </h2>
          <div className="flex flex-col">
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
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
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
                  <Button type="submit" href="/choose-game">
                    Log in to Play
                  </Button>
                </div>
              </form>

              <p className="mt-2 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  to={"/signup"}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  Create a New Player{" "}
                </Link>
              </p>
            </div>
            {/* <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 text-white bg-green-400"
            >
              Yes
            </button> */}
            <button
              onClick={handleCancelClick}
              className="rounded px-4 py-2 mt-4 text-white bg-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
