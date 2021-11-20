import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { SENDCHANGEEMAIL } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";

const EmailChange = () => {
  const [sendChangeEmailMutation, { loading }] = useMutation(SENDCHANGEEMAIL);
  const { token } = useRouteMatch().params;
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const re =
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return setError(true);
    }

    setError(false);
    try {
      const response = await sendChangeEmailMutation({
        variables: { email, token },
      });
      const data = response.data.sendChangeEmail;
      if (data.errorId) {
        throw new Error(data.errorId);
      }
      notifySuccess(`Continue at ${email}`);
      history.push("/my/dashboard");
    } catch (error) {
      errorHandler(error, history);
    }
  };

  return (
    <div className="w-screen h-screen bg-light-grey flex justify-center items-center">
      <form
        noValidate
        onSubmit={submit}
        className="dialog auth__form bg-white shadow pt-8 flex flex-col"
      >
        <p className="text-lg sm:text-xl mb-5 px-8 sm:px-10 nunito">
          Enter Your New Email
        </p>
        <div className="w-full px-8 sm:px-10 mb-4 flex flex-col">
          <input
            id={"email"}
            className="focus:outline-none p-3 text-gray-700"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"Email"}
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            autoFocus
          />
          {error && (
            <p className="mt-3 text-sm text-red">
              Please enter a valid email address
            </p>
          )}
        </div>
        <div className="relative mt-2 mx-8 sm:mx-10">
          <Button submit={true}>Update</Button>
          <Loader display={loading} />
        </div>
        <div
          className="bg-light-grey text-gray-700 flex justify-center mt-6 py-8"
          style={{ background: "#F1F1F1" }}
        ></div>
      </form>
    </div>
  );
};

export default EmailChange;
