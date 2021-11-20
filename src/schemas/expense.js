import * as Yup from "yup";

export const addExpenseSchema = Yup.object().shape({
  date: Yup.string().required("date is required"),
  name: Yup.string().required("name is required"),
  amount: Yup.number()
    .required("amount is required")
    .min(1, "amount must be greater then zero"),
});

export const updateExpenseSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  amount: Yup.number()
    .required("amount is required")
    .min(1, "amount must be greater then zero"),
});
