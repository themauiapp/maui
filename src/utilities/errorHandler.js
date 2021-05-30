import { notifyError } from "../services/notify";
import { logout } from "../services/auth";
import { clearCookies } from "../services/cookie";

const errorHandler = async (error, history, context = null) => {
  let errorMessage = "An error occured";

  if (error.networkError && error.networkError.statusCode === 419) {
    await clearCookies();
    await logout();
    notifyError("Session expired");
    history.push("/session/new");
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
