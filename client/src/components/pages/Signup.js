import React from "react";

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

  //Part of the return should be a ternary operator for if data is returned from the addUser function then provide a link back to the homepage and if not then show the signup form.

  return <div>Signup</div>;
}

export default Signup;
