import React, { useContext } from "react";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { updateExpenseSchema } from "../../schemas/expense";
import { UPDATEEXPENSE } from "../../graphql/expense";
import { useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { notifySuccess } from "../../services/notify";
import errorHandler from "../../utilities/errorHandler";

const UpdateExpense = ({ expense: { id, name, amount, created_at } }) => {
  const { dialogs, setDialogs, setLastUpdatedExpense } =
    useContext(AuthHomeContext);
  const [updateExpenseMutation, { loading }] = useMutation(UPDATEEXPENSE);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      amount: Number(amount),
    },
    validationSchema: updateExpenseSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      const variables = { ...values };
      if (
        variables.name.toLowerCase() === name &&
        variables.amount === Number(amount)
      ) {
        return;
      }

      if (variables.name.toLowerCase() === name) {
        delete variables.name;
      }

      if (variables.amount === Number(amount)) {
        delete variables.amount;
      }
      updateExpenses(variables);
    },
  });

  const updateExpenses = async (variables) => {
    variables["id"] = id;
    try {
      const response = await updateExpenseMutation({ variables });
      const data = response.data.updateExpense;

      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      notifySuccess(`${variables.name ?? name} updated successfully`);
      setDialogs({ ...dialogs, updateExpense: false });
      setLastUpdatedExpense(data.expense);
      formik.resetForm();
    } catch (error) {
      errorHandler(error, history);
    }
  };

  const fields = ["Date", "Name", "Amount"];
  const displayFields = () => {
    return fields.map((field, index) => {
      const id = field.toLowerCase();
      if (field === "Date") {
        return (
          <div key={index} className="flex flex-col mb-5">
            <label htmlFor="date" className="text-sm mb-2">
              Date
            </label>
            <DatePicker
              id="date"
              selected={new Date(created_at)}
              className="w-full bg-transparent border focus:outline-none pl-6 py-4"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            />
          </div>
        );
      }

      return (
        <div key={index} className="flex flex-col mb-5">
          <label htmlFor={id} className="text-sm mb-2">
            {field}
          </label>
          <input
            name={id}
            type={field === "Amount" ? "number" : "text"}
            onChange={formik.handleChange}
            value={formik.values?.[id]}
            className="focus:outline-none w-full p-4 text-gray-700"
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
          />
          {formik.errors?.[id] && (
            <p className="mt-2 text-sm text-red">{formik.errors?.[id]}</p>
          )}
        </div>
      );
    });
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-white rounded p-10 flex flex-col dialog"
    >
      <p className="text-lg text-center font-semibold mb-5">
        Update {formik.values.name}
      </p>
      <form noValidate className="w-full flex flex-col">
        {displayFields()}
        <div className="relative mt-1">
          <Button submit={true} onClick={formik.handleSubmit}>
            Update {formik.values.name}
          </Button>
          <Loader display={loading} />
        </div>
      </form>
    </div>
  );
};

export default UpdateExpense;
