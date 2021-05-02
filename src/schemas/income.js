import * as Yup from "yup";

export const AddIncomeSchema = Yup.object().shape({
  currency: Yup.string().required("currency is required"),
  income: Yup.number()
    .required("income is required")
    .min(1000, "valid income is required"),
});
