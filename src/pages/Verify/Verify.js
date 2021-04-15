import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { VERIFYGOOGLELOGIN } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../contexts/AppContext";
import { setCsrfCookie, setUserCookie } from "../../services/cookie";
import { notifySuccess, notifyError } from "../../services/notify";
import createApolloClient from "../../utilities/createApolloClient";

const Verify = () => {
  const [verifyGoogleLoginMutation] = useMutation(VERIFYGOOGLELOGIN, {
    client: createApolloClient(window),
  });
  const history = useHistory();
  const { changeUser } = useContext(AppContext);
  useEffect(() => {
    verify();
    // eslint-disable-next-line
  }, []);

  const verify = () => {
    if (window.location.pathname === "/google/login") {
      verifyGoogleLogin();
    }
  };

  const verifyGoogleLogin = async () => {
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Africa/Lagos";
    const variables = { timezone };
    try {
      await setCsrfCookie();
      const response = await verifyGoogleLoginMutation({ variables });
      const data = response.data.verifyGoogleLogin;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      setUserCookie(data, changeUser);
      history.push("/dashboard");
      notifySuccess("logged in successfully");
    } catch (error) {
      console.log(error);
      notifyError("an error occured");
      history.push("/session/new");
    }
  };

  return (
    <div className="w-screen h-screen">
      <Spinner display={true} />
    </div>
  );
};

export default Verify;
