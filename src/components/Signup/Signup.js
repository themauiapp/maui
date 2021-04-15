import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { SIGNUP, GOOGLELOGIN } from "../../graphql/auth";
import { signupSchema } from "../../schemas/auth";
import { AppContext } from "../../contexts/AppContext";
import { setCsrfCookie, setUserCookie } from "../../services/cookie";
import { notifySuccess } from "../../services/notify";
import errorHandler from "../../utilities/errorHandler";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

const Signup = ({ setError, toggleSpinner }) => {
  const [signupMutation] = useMutation(SIGNUP);
  const [googleLoginMutation] = useMutation(GOOGLELOGIN);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const history = useHistory();
  const { changeUser } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await setCookie(true);
      signupUser({ ...values });
    },
  });

  useEffect(() => {
    const values = Object.values(formik.errors);
    setError(values.length > 0);
  }, [formik.errors, setError]);

  const fields = [
    {
      name: "first_name",
      type: "text",
    },
    {
      name: "last_name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
  ];

  const setCookie = async (loading) => {
    if (loading) {
      setLoading(true);
    }

    try {
      await setCsrfCookie();
    } catch (error) {
      errorHandler(error, history);
      setLoading(false);
    }
  };

  const signupUser = async (values) => {
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Africa/Lagos";
    const variables = {
      ...values,
      timezone,
      password_confirmation: values.password,
    };
    setLoading(true);
    try {
      const response = await signupMutation({ variables });
      const data = response.data.signup;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      setUserCookie(data, changeUser);
      history.push("/dashboard");
      notifySuccess("signed up successfully");
    } catch (error) {
      errorHandler(error, history);
      setLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    if (googleLoading) {
      return;
    }

    toggleSpinner();
    setGoogleLoading(true);
    try {
      await setCookie();
      const response = await googleLoginMutation({ variables: { id: 100 } });
      const { redirect_url } = response.data.googleLogin;
      window.location.href = redirect_url;
    } catch (error) {
      errorHandler(error, history);
      toggleSpinner();
      setGoogleLoading(false);
    }
  };

  const displayFields = () => {
    const formFields = [...fields];
    return formFields.map((field, index) => {
      return (
        <div key={index} className="w-full px-10 mb-4 flex flex-col">
          <input
            id={field.name}
            className={`focus:outline-none ${
              field.name.includes("name") ? "capitalize" : ""
            } p-3 text-gray-700`}
            type={field.type}
            name={field.name}
            onChange={formik.handleChange}
            placeholder={
              field.name.replace(/_/, " ").charAt(0).toUpperCase() +
              field.name.replace(/_/, " ").slice(1)
            }
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            autoFocus={field.name === "first_name"}
          />
          {formik.errors?.[field.name] && (
            <p className="mt-2 text-sm text-red">
              {formik.errors?.[field.name]}
            </p>
          )}
        </div>
      );
    });
  };
  return (
    <form
      noValidate
      className="w-full pt-8 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <p className="text-lg sm:text-xl mb-5 px-10 nunito">Get Started</p>
      {displayFields()}
      <div className="relative mt-2 mx-10">
        <Button submit={true}>Signup</Button>
        <Loader display={loading} />
      </div>
      <div
        onClick={() => {
          signupWithGoogle();
        }}
        className="cursor-pointer text-center bg-light-grey text-gray-700 flex justify-center mt-5 py-5"
      >
        signup with{" "}
        <p className="relative" style={{ left: "5px" }}>
          Google
        </p>
      </div>
    </form>
  );
};

export default Signup;
