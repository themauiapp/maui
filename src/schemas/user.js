import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
});
