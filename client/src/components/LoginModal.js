import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginFormValidator } from "../utils/useLoginFormValidator.js";
import "../styles/modules.css";

const LoginModal = ({ setModalOn, setChoice }) => {
  const navigate = useNavigate();

  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  const [formState, setFormState] = useState({ username: "", password: "" });
  const { errors, validateForm, onBlurField } =
    useLoginFormValidator(formState);

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const isValid = formState.username !== "";

  const [touched, setTouched] = useState(false);
  const [player, isPlayer] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //set the form state equal to itself and then add the value to the name of the target(username or password)
    console.log(value);
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
    console.log(formState);

    // alert(JSON.stringify(formState, null, 2));

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      //Set the value of the token in local storage to the token received.
      Auth.login(data.login.token);
      Auth.logUsername(data.login.user.username);
      console.log(data.login.user.username);
      // if user.state = logged in then window.location.href = "/choose-game";

      if (Auth.loggedIn()) {
        window.location.href = "/choose-game";
      }
    } catch (err) {
      console.log(err);
      isPlayer(true);
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
    });
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
    <AnimatePresence mode="wait">
      <motion.div
        className="bg-zinc-200/75 fixed inset-0 z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        <div className="flex h-screen justify-center items-center">
          <motion.div
            className="flex-col justify-center bg-white opacity-100 py-6 px-6 border-4 w-1/3 border-sky-500 rounded-xl"
            variants={modal}
          >
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to play!
            </h2>
            <div className="flex flex-col">
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
                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {touched ? (isValid ? "✅" : "❌") : null}
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
                        value={formState.password}
                        onChange={handleChange}
                        onBlur={onBlurField}
                        autoComplete="current-password"
                        className={
                          errors.password.dirty && errors.password.error
                            ? "formFieldError"
                            : "formField"
                        }
                        //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // {clsx(
                        //   styles.formField,
                        //   errors.password.dirty &&
                        //   errors.password.error &&
                        //   styles.formFieldError
                        // )}
                      />
                      {errors.password.dirty && errors.password.error ? (
                        <p className="formFieldErrorMessage">
                          {errors.password.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <button
                    className="btn btn-block btn-info flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Log In to Play
                  </button>
                  {player ? (
                    <p className="formFieldErrorMessage">
                      Player or password is incorrect
                    </p>
                  ) : null}
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
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
