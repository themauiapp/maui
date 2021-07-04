import React, { useState, useContext } from "react";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { addExpenseSchema } from "../../schemas/expense";
import { ADDEXPENSE } from "../../graphql/expense";
import { useMutation } from "@apollo/client";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import DatePicker from "react-datepicker";
import { parseDate, months } from "../../utilities/date";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";

const AddExpense = () => {
  const { dialogs, setDialogs, setLastUpdatedExpense } =
    useContext(AuthHomeContext);
  const [addExpenseMutation, { loading }] = useMutation(ADDEXPENSE);
  const history = useHistory();
  const [date, setDate] = useState(new Date());
  const formik = useFormik({
    initialValues: { date: parseDate(date), name: "", amount: 0 },
    validationSchema: addExpenseSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      const parsedDate = parseDate(date);
      let parsedValues;
      if (parseDate(new Date()) === parsedDate) {
        delete values.date;
        parsedValues = { ...values };
      } else {
        parsedValues = { ...values, date: parsedDate };
      }
      addExpense(parsedValues);
    },
  });

  const addExpense = async (variables) => {
    try {
      const response = await addExpenseMutation({ variables });
      const data = response.data.addExpense;

      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      notifySuccess(`${variables.name} added successfully`);
      setDialogs({ ...dialogs, addExpense: false });
      setLastUpdatedExpense(data.expense);
      formik.resetForm();
    } catch (error) {
      errorHandler(error, history, {
        month: months[date.getMonth()].slice(0, 3),
        year: date.getFullYear(),
      });
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
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
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
      <p className="text-lg text-center font-semibold mb-5">Add New Expense</p>
      <form noValidate className="w-full flex flex-col">
        {displayFields()}
        <div className="relative mt-1">
          <Button submit={true} onClick={formik.handleSubmit}>
            Add {formik.values.name}
          </Button>
          <Loader display={loading} />
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
