import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useFormik } from "formik";
import { verifyResetEmailSchema } from "../../schemas/user";
import { useMutation } from "@apollo/client";
import { VERIFYRESETEMAIL } from "../../graphql/user";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";

const VerifyResetEmail = () => {
  const { setDialogs, dialogs } = useContext(AuthHomeContext);
  const [verifyResetEmailMutation, { loading }] = useMutation(VERIFYRESETEMAIL);
  const history = useHistory();
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: verifyResetEmailSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      verifyResetEmail(values);
    },
  });

  const verifyResetEmail = async (variables) => {
    try {
      await verifyResetEmailMutation({ variables });
      notifySuccess("Continue at your email");
      setDialogs({ ...dialogs, verifyResetEmail: false });
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
        Confirm Your Password
      </p>
      <form novalidate onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-5">
          <label htmlFor="income" className="text-sm mb-3">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="focus:outline-none border border-faint-rgba-black w-full p-4 text-gray-700"
            autoFocus
          />
          {formik.errors.password && (
            <p className="mt-2 text-sm text-red">{formik.errors.password}</p>
          )}
        </div>
        <div className="relative">
          <Button submit={true}>Confirm</Button>
          <Loader display={loading} />
        </div>
      </form>
    </div>
  );
};

export default VerifyResetEmail;
