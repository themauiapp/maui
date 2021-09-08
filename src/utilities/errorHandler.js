import { notifyError } from "../services/notify";
import { clearCookies } from "../services/cookie";

const errorHandler = async (error, history, context = null) => {
  let errorMessage = "Failed to Connect to API";

  if (error.networkError && error.networkError.statusCode === 419) {
    history.push("/session/new");
    await clearCookies();
    notifyError("Session Expired");
    return;
  }

  if (error.message === "AuthenticationFailed") {
    errorMessage = "Incorrect Username Or Password";
  }

  if (
    error.message === "UserExistsAlready" ||
    error.message === "InvalidEmailResetAddress"
  ) {
    errorMessage = "User With Email Exists Already";
  }

  if (
    error.message === "NoPeriodIncomeExists" ||
    error.message === "PeriodDoesNotExist"
  ) {
    errorMessage = `No income recorded for ${context.month} ${context.year}`;
  }

  if (error.message === "AvatarNotUpdated") {
    errorMessage = "Avatar Not Updated";
  }

  if (error.message === "InvalidEmailResetToken") {
    errorMessage = "Invalid Email Reset Token";
  }

  console.log(error);
  notifyError(errorMessage);
};

export default errorHandler;
