import axios from "axios";

const createAxiosObject = () => {
  axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "application/json",
    Accepts: "application/json",
  };
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
  });

  return API;
};

export default createAxiosObject;
