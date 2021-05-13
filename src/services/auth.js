import createAxiosObject from "./axios";

const verifyEmail = (id, hash, expires, signature) => {
  const API = createAxiosObject();
  return API.post(
    `/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
  );
};

const logout = () => {
  const API = createAxiosObject();
  return API.post("/api/logout");
};

export { verifyEmail, logout };
