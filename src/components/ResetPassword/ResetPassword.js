import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { useMutation } from "@apollo/client";
import { RESETPASSWORD } from "../../graphql/auth";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";

const ResetPassword = () => {
  const [resetPasswordMutation, { loading }] = useMutation(RESETPASSWORD);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { token } = useRouteMatch().params;
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const error = password.length < 8;
    setError(error);
    if (error) {
      return;
    }

    const variables = {
      token,
      email,
      password,
      password_confirmation: password,
    };
    try {
      await resetPasswordMutation({ variables });
      notifySuccess("Password changed successfully");
      history.push("/session/new");
    } catch (error) {
      errorHandler(error, history);
    }
  };
  return (
    <form noValidate onSubmit={submit} className="w-full pt-8 flex flex-col">
      <p className="text-lg sm:text-xl mb-5 px-8 sm:px-10 nunito">
        Reset Your Password
      </p>
      <div className="w-full px-8 sm:px-10 mb-4 flex flex-col">
        <input
          id={"password"}
          className="focus:outline-none p-3 text-gray-700"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
          style={{ border: "1px solid rgba(0,0,0,0.05)" }}
          autoFocus
        />
        {error && (
          <p className="mt-3 text-sm text-red">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      <div className="relative mt-2 mx-8 sm:mx-10">
        <Button submit={true}>Reset</Button>
        <Loader display={loading} />
      </div>
      <div className="bg-light-grey text-gray-700 flex justify-center mt-6 py-8"></div>
    </form>
  );
};

export default ResetPassword;
