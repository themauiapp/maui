import createAxiosObject from "./axios";
import Cookies from "universal-cookie";

const setCsrfCookie = () => {
  return createAxiosObject().get("sanctum/csrf-cookie");
};

const setUserCookie = (data, setUser) => {
  const { name, email, email_verified_at, avatar, total_income } = data.user;
  const user = { name, email, email_verified_at, avatar, total_income };
  const cookies = new Cookies();
  const expiryDateObject = new Date(
    new Date().getTime() + 1000 * 20 * 365 * 86400
  );
  cookies.set("user", user, {
    path: "/",
    expires: expiryDateObject,
  });
  setUser(user);
};

export { setCsrfCookie, setUserCookie };
