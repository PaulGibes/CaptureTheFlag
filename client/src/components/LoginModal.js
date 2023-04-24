import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginFormValidator } from "../utils/useLoginFormValidator.js";
import "../styles/modules.css";
import {} from "../assets/images";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";

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
        className="bg-modal fixed inset-0 z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        <div className="flex h-screen justify-center items-center">
          <motion.div
            className="flex-col justify-center bg-modal-login opacity-100 w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5   "
            variants={modal}
          >
            <button
              onClick={handleCancelClick}
              className=" text-gray-500 mt-10 float-right pr-20 hover:text-orange-500 "
            >
              Cancel X
              {/* absolute top-5 right-20 sm:right-24 md:right-32 lg:right-28 */}
            </button>
            <h2 className="mt-10 clear-both text-center text-2xl tracking-tight text-white">
              Welcome,
            </h2>
            <p className="text-center text-white text-sm mb-5">
              Log in with your player name to play:
            </p>
            <div className="flex flex-col w-2/3 px-5 pb-12 mx-auto">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-white">
                      Player name
                    </label>
                    <div className="">
                      <label className="relative text-orange-500 focus-within:text-orange-600 block">
                        <BiUser className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />

                        <input
                          id="name"
                          name="username"
                          type="text"
                          value={formState.username}
                          onChange={handleChange}
                          onBlur={onBlurField}
                          placeholder="username"
                          className={
                            errors.username.dirty && errors.username.error
                              ? "formFieldError form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
                              : "formField form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
                          }
                        />
                      </label>
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
                      <label className="block text-sm font-medium leading-6 text-white">
                        Password
                      </label>
                    </div>
                    <div className="">
                      <label className="relative text-orange-500 focus-within:text-orange-600 block">
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
                              ? "formFieldError form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 tracking-[.5em]  focus:outline-none"
                              : "formField form-input border border-gray-900 py-2 px-4  placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 tracking-[.5em]  focus:outline-none"
                          }
                          //className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // {clsx(
                          //   styles.formField,
                          //   errors.password.dirty &&
                          //   errors.password.error &&
                          //   styles.formFieldError
                          // )}
                        />
                      </label>
                      {errors.password.dirty && errors.password.error ? (
                        <p className="formFieldErrorMessage">
                          {errors.password.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <button
                    className="btn btn-block btn-outsider flex w-full justify-center rounded-md   px-3 py-1.5 text-sm   leading-6 text-white shadow-sm border border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  "
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    <h3> Log In to Play </h3>
                  </button>
                  {player ? (
                    <p className="formFieldErrorMessage my-0 text-center">
                      Player or password is incorrect
                    </p>
                  ) : null}

                  <p className=" text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <Link
                      to={"/signup"}
                      className="font-semibold leading-6 accent hover:text-orange-600"
                    >
                      {" "}
                      Create a New Player{" "}
                    </Link>
                  </p>
                </form>
              </div>
              {/* <button
              onClick={handleOKClick}
              className="rounded px-4 py-2 text-white bg-green-400"
            >
              Yes
            </button> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
