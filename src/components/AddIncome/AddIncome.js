import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { useFormik } from "formik";
import { AddIncomeSchema } from "../../schemas/income";
import { ADDINCOME } from "../../graphql/income";
import { useMutation } from "@apollo/client";
import currencies from "./Currencies";
import { months } from "../../utilities/date";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { notifySuccess } from "../../services/notify";
import { setUserCookie } from "../../services/cookie";
import errorHandler from "../../utilities/errorHandler";

const AddIncome = () => {
  const { user, changeUser } = useContext(AppContext);
  const [addIncomeMutation, { loading }] = useMutation(ADDINCOME);
  const history = useHistory();
  const formik = useFormik({
    initialValues: { currency: "₦", income: 0 },
    validationSchema: AddIncomeSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      if (user.currency) {
        delete values.currency;
      }
      addIncome(values);
    },
  });

  const addIncome = async (variables) => {
    try {
      const response = await addIncomeMutation({ variables });
      const data = response.data.addIncome;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      notifySuccess("income details recorded");
      setUserCookie(data.income, changeUser);
      window.location.href = window.location.pathname;
    } catch (error) {
      errorHandler(error, history);
    }
  };

  return (
    <div
      className="bg-white rounded p-10 flex flex-col"
      style={{ width: "450px" }}
    >
      <p className="text-lg text-center font-semibold mb-3">
        Add Income for {months[new Date().getMonth()]}{" "}
        {new Date().getFullYear()}
      </p>
      {!user.currency ? (
        <p className="leading-7 mb-4">
          Now that you are all verified, two final bits of information are
          required. What primary currency do you earn in and what is your total
          income for this month ?
        </p>
      ) : (
        <p className="leading-7 mb-4">
          Hey {user.name.split(" ")[1]}, it's a new month. Record your income
          for this month and you can be on your way tracking expenses.
        </p>
      )}
      <form noValidate onSubmit={formik.handleSubmit}>
        {!user.currency && (
          <div className="flex flex-col mb-5">
            <label htmlFor="currency" className="text-sm mb-3">
              Currency
            </label>
            <div className="relative w-full">
              <select
                id="currency"
                name="currency"
                onChange={formik.handleChange}
                value={formik.values.currency}
                className="focus:outline-none w-full p-4 text-gray-700"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                {currencies.map((currency, index) => {
                  return (
                    <option key={index} value={currency.symbol}>
                      {currency.name}
                    </option>
                  );
                })}
              </select>
              <i
                className="absolute right-0 text-revolver-purple fa fa-chevron-right"
                style={{
                  transform: "rotate(90deg)",
                  top: "calc((100% - 13px)/2)",
                  marginRight: "1rem",
                }}
              ></i>
            </div>
          </div>
        )}
        <div className="flex flex-col mb-5">
          <label htmlFor="income" className="text-sm mb-3">
            Income
          </label>
          <input
            name="income"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.income}
            className="focus:outline-none w-full p-4 text-gray-700"
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
          />
          {formik.errors.income && (
            <p className="mt-2 text-sm text-red">{formik.errors.income}</p>
          )}
        </div>
        <div className="relative">
          <Button submit={true}>Add</Button>
          <Loader display={loading} />
        </div>
      </form>
    </div>
  );
};

export default AddIncome;
