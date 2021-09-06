import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  first_name: Yup.string().required("first name is required"),
  last_name: Yup.string().required("last name is required"),
  email: Yup.string()
    .required("email is required")
    .email("invalid email address"),
  password: Yup.string().min(8, "password must be at least 8 characters"),
});
