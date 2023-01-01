import createAxiosObject from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const mauiCookies = ["maui_cookie", "XSRF-TOKEN", "maui_token"];

const setCsrfCookie = () => {
  return createAxiosObject().get("sanctum/csrf-cookie");
};

const setUserContext = (data, setUser = null, key = "user") => {
  const {
    id,
    name,
    email,
    email_verified_at,
    avatar,
    total_income,
    timezone,
    currency,
    latest_income,
  } = data[key];
  const user = {
    id,
    name,
    email,
    email_verified_at,
    avatar,
    total_income,
    timezone,
    currency,
    latest_income,
  };
  const expiryDateObject = new Date(new Date().getTime() + 1000 * 3 * 86400);
  cookies.set("maui_token", generateToken(), {
    path: "/",
    domain: "." + window.location.hostname,
    expires: expiryDateObject,
  });

  if (setUser) {
    setUser(user);
  }
};

const generateToken = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "#";

  for (let i = 1; i < 8; i++) {
    hash =
      hash + characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return hash;
};
const clearCookies = () => {
  mauiCookies.forEach((cookie) => {
    cookies.remove(cookie, { path: "/", domain: window.location.hostname });
  });
};

export { setCsrfCookie, setUserContext, clearCookies };
