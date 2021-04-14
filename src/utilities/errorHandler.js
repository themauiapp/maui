import { notifyError } from "../services/notify";

const errorHandler = ({ message }, history) => {
  let errorMessage = "an error occured";

  if (message === "AuthenticationFailed") {
    errorMessage = "incorrect username or password";
  }

  if (message === "UserExistsAlready") {
    errorMessage = "user with email exists already";
  }

  console.log(message);
  notifyError(errorMessage);
};

export default errorHandler;
