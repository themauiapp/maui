import axios from "./axios";

const setCsrfCookie = () => {
  return axios.get("sanctum/csrf-cookie");
};

export default setCsrfCookie;
