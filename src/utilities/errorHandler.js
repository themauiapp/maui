import { notifyError } from "../services/notify";
import { clearCookies } from "../services/cookie";

const errorHandler = async (error, history, context = null) => {
  let errorMessage = "an error occured";

  if (error.networkError && error.networkError.statusCode === 419) {
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

  if (
    error.message === "NoPeriodIncomeExists" ||
    error.message === "PeriodDoesNotExist"
  ) {
    errorMessage = `no income recorded for ${context.month} ${context.year}`;
  }

  console.log(error);
  notifyError(errorMessage);
};

export default errorHandler;
