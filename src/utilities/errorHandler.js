import { notifyError } from "../services/notify";
import { clearCookies } from "../services/cookie";

const errorHandler = async (error, history) => {
  let errorMessage = "an error occured";

  if (error.networkError.statusCode === 419) {
    notifyError("Session expired");
    await clearCookies();
    history.push("/session/new");
    return;
  }

  if (error.message === "AuthenticationFailed") {
    errorMessage = "incorrect username or password";
  }

  if (error.message === "UserExistsAlready") {
    errorMessage = "user with email exists already";
  }

  console.log(error.networkError);
  notifyError(errorMessage);
};

export default errorHandler;
