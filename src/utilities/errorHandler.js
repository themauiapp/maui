import { notifyError } from "../services/notify";
import { clearCookies } from "../services/cookie";

const errorHandler = async (error, history, context = null) => {
  let errorMessage = "An Error Occured";

  if (error.networkError && error.networkError.statusCode === 419) {
    history.push("/session/new");
    await clearCookies();
    notifyError("Session Expired");
    return;
  }

  if (error.message === "AuthenticationFailed") {
    errorMessage = "Incorrect username or password";
  }

  if (error.message === "UserExistsAlready") {
    errorMessage = "User with email exists already";
  }

  if (
    error.message === "NoPeriodIncomeExists" ||
    error.message === "PeriodDoesNotExist"
  ) {
    errorMessage = `No income recorded for ${context.month} ${context.year}`;
  }

  if (error.message === "AvatarNotUpdated") {
    errorMessage = "Avatar not updated";
  }

  console.log(error);
  notifyError(errorMessage);
};

export default errorHandler;
