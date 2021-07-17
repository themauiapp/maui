import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { notifyError, notifySuccess } from "../../services/notify";
import { setCsrfCookie, setUserCookie } from "../../services/cookie";
import Cookies from "universal-cookie";
import { useMutation } from "@apollo/client";
import { LOGIN, GOOGLELOGIN, RESETPASSWORDEMAIL } from "../../graphql/auth";
import { loginSchema } from "../../schemas/auth";
import { AppContext } from "../../contexts/AppContext";
import errorHandler from "../../utilities/errorHandler";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginMutation] = useMutation(LOGIN);
  const [googleLoginMutation] = useMutation(GOOGLELOGIN);
  const [resetPasswordEmailMutation] = useMutation(RESETPASSWORDEMAIL);
  const { changeUser } = useContext(AppContext);
  const history = useHistory();
  const cookies = new Cookies();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await setCookie(true);
      loginUser({ ...values });
    },
  });

  const setCookie = async (loading) => {
    if (cookies.get("XSRF-TOKEN")) {
      return;
    }

    if (loading) {
      setLoading(true);
    }

    try {
      await setCsrfCookie();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loginUser = async (variables) => {
    setLoading(true);
    try {
      const response = await loginMutation({ variables });
      const data = response.data.login;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      setUserCookie(data, changeUser);
      history.push("/my/dashboard");
      notifySuccess("Logged in successfully");
    } catch (error) {
      errorHandler(error, history);
      setLoading(false);
    }
  };

  const fields = ["email", "password"];

  const displayFields = () => {
    const formFields = [...fields];
    return formFields.map((field, index) => {
      return (
        <div key={index} className="w-full px-8 sm:px-10 mb-4 flex flex-col">
          <input
            id={field.name}
            className="focus:outline-none border border-faint-rgba-black p-3 text-gray-900"
            type={field}
            name={field}
            onChange={formik.handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            autoFocus={field === "email"}
          />
          {formik.errors?.[field] && (
            <p className="mt-2 text-sm text-red">{formik.errors?.[field]}</p>
          )}
        </div>
      );
    });
  };

  const loginWithGoogle = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await setCookie();
      const response = await googleLoginMutation({ variables: { id: 100 } });
      const { redirect_url } = response.data.googleLogin;
      window.location.href = redirect_url;
    } catch (error) {
      errorHandler(error, history);
      setLoading(false);
    }
  };

  const resetPasswordEmail = async () => {
    const re =
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formik.values.email)) {
      return notifyError("Enter a valid email address");
    }

    await setCookie();
    setLoading(true);
    try {
      const variables = { email: formik.values.email };
      await resetPasswordEmailMutation({ variables });
      notifySuccess("Continue at your email address");
      formik.resetForm();
    } catch (error) {
      errorHandler(error, history);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      className="w-full pt-8 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <p className="text-lg sm:text-xl mb-5 px-8 sm:px-10 nunito">
        Welcome back
      </p>
      {displayFields()}
      <div className="relative mt-2 mx-8 sm:mx-10">
        <Button submit={true}>Login</Button>
        <Loader display={loading} />
      </div>
      <div className="mt-4">
        <p
          onClick={() => {
            resetPasswordEmail();
          }}
          className="cursor-pointer text-center text-gray-800"
        >
          forgot password
        </p>
      </div>
      <div
        onClick={() => {
          loginWithGoogle();
        }}
        className="cursor-pointer text-center bg-light-grey text-gray-700 flex justify-center mt-5 py-5"
      >
        login with{" "}
        <p className="relative" style={{ left: "5px" }}>
          Google
        </p>
      </div>
    </form>
  );
};

export default Login;
