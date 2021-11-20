import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { UpdateIncomeSchema } from "../../schemas/income";
import { useFormik } from "formik";
import { UPDATEINCOME } from "../../graphql/income";
import { useMutation } from "@apollo/client";
import { months } from "../../utilities/date";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { notifyError, notifySuccess } from "../../services/notify";
import { setUserContext } from "../../services/cookie";
import errorHandler from "../../utilities/errorHandler";

const UpdateIncome = () => {
  const {
    user: {
      latest_income: { total: currentIncome },
    },
    changeUser,
  } = useContext(AppContext);
  const [updateIncomeMutation, { loading }] = useMutation(UPDATEINCOME);
  const formik = useFormik({
    initialValues: { income: currentIncome },
    validationSchema: UpdateIncomeSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      if (values.income <= currentIncome) {
        return notifyError("Income must be greater than current income");
      }

      updateIncome(values);
    },
  });
  const history = useHistory();

  const updateIncome = async (variables) => {
    try {
      const response = await updateIncomeMutation({ variables });
      const data = response.data.updateIncome;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      notifySuccess("Income updated successfully");
      setUserContext(data.income, changeUser);
      window.location.href = window.location.pathname;
    } catch (error) {
      errorHandler(error, history);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="dialog bg-white rounded p-10 flex flex-col"
    >
      <p className="text-lg text-center font-semibold mb-3">
        Update Income for {months[new Date().getMonth()]}{" "}
        {new Date().getFullYear()}
      </p>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-5">
          <label htmlFor="income" className="text-sm mb-3">
            Income
          </label>
          <input
            name="income"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.income}
            className="focus:outline-none border border-faint-rgba-black w-full p-4 text-gray-700"
            autoFocus
          />
          {formik.errors.income && (
            <p className="mt-2 text-sm text-red">{formik.errors.income}</p>
          )}
        </div>
        <div className="relative">
          <Button submit={true}>Update</Button>
          <Loader display={loading} />
        </div>
      </form>
    </div>
  );
};

export default UpdateIncome;
