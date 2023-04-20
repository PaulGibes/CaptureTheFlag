import { useState } from "react";

import {
    usernameValidator,
   passwordValidator,
 } from "./validation.js";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (formState) => {
  const [errors, setErrors] = useState({
    username: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    // confirmPassword: {
    //   dirty: false,
    //   error: false,
    //   message: "",
    // },
  });

  const validateForm = ({ formState, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    const nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { username, password  } = formState;

    if (nextErrors.username.dirty && (field ? field === "username" : true)) {
      const usernameMessage = usernameValidator(username, formState);
      nextErrors.username.error = !!usernameMessage;
      nextErrors.username.message = usernameMessage;
      if (!!usernameMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, formState);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    // if (
    //   nextErrors.confirmPassword.dirty &&
    //   (field ? field === "confirmPassword" : true)
    // ) {
    //   const confirmPasswordMessage = confirmPasswordValidator(
    //     confirmPassword,
    //     form
    //   );
    //   nextErrors.confirmPassword.error = !!confirmPasswordMessage;
    //   nextErrors.confirmPassword.message = confirmPasswordMessage;
    //   if (!!confirmPasswordMessage) isValid = false;
    // }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ formState, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
