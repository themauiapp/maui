import createAxiosObject from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const mauiCookies = ["maui_cookie", "XSRF-TOKEN", "maui_user"];

const setCsrfCookie = () => {
  return createAxiosObject().get("sanctum/csrf-cookie");
};

const setUserCookie = (data, setUser = null) => {
  const {
    id,
    name,
    email,
    email_verified_at,
    avatar,
    total_income,
    timezone,
    currency,
    telegram_id,
    latest_income,
  } = data.user;
  const user = {
    id,
    name,
    email,
    email_verified_at,
    avatar,
    total_income,
    timezone,
    currency,
    telegram_id,
    latest_income,
  };
  const expiryDateObject = new Date(
    new Date().getTime() + 1000 * 20 * 365 * 86400
  );
  cookies.set("maui_user", user, {
    path: "/",
    expires: expiryDateObject,
  });
  if (setUser) {
    setUser(user);
  }
};

const clearCookies = () => {
  mauiCookies.forEach((cookie) => {
    cookies.remove(cookie, { path: "/", domain: "localhost" });
  });
};

export { setCsrfCookie, setUserCookie, clearCookies };
