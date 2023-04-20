export const usernameValidator = username => {
    if (!username) {
      return "Username is required";
    } else if (username.length < 3) {
      return "Username must have a minimum 3 characters";
    }
    return "";
  };
  
export const passwordValidator = password => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must have a minimum 8 characters";
    }
    return "";
  };