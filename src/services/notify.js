import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(message, { duration: 4000, style: { padding: "1rem" } });
};

const notifyError = (message) => {
  toast.error(message, { duration: 4000, style: { padding: "1rem" } });
};

export { notifySuccess, notifyError };
