import React, { useEffect, useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { VERIFYGOOGLELOGIN } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { verifyEmail as verifyEmailService } from "../../services/auth";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../contexts/AppContext";
import { setUserCookie } from "../../services/cookie";
import { notifySuccess, notifyError } from "../../services/notify";
import createApolloClient from "../../utilities/createApolloClient";

const Verify = () => {
  const [verifyGoogleLoginMutation] = useMutation(VERIFYGOOGLELOGIN, {
    client: createApolloClient(window),
  });
  const history = useHistory();
  const { changeUser } = useContext(AppContext);
  const { params } = useRouteMatch();
  useEffect(() => {
    verify();
    // eslint-disable-next-line
  }, []);

  const verify = () => {
    if (window.location.pathname === "/google/login") {
      verifyGoogleLogin();
    }

    if (window.location.pathname.startsWith("/email/verify")) {
      verifyEmail();
    }
  };

  const verifyGoogleLogin = async () => {
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Africa/Lagos";
    const variables = { timezone };
    try {
      const response = await verifyGoogleLoginMutation({ variables });
      const data = response.data.verifyGoogleLogin;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      setUserCookie(data, changeUser);
      history.push("/my/dashboard");
      notifySuccess("logged in successfully");
    } catch (error) {
      console.log(error);
      notifyError("an error occured");
      history.push("/session/new");
    }
  };

  const verifyEmail = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const expires = queryParams.get("expires");
      const signature = queryParams.get("signature");
      const response = await verifyEmailService(
        params.id,
        params.hash,
        expires,
        signature
      );
      setUserCookie(response.data, changeUser);
      notifySuccess("email verified successfully");
    } catch (error) {
      notifyError("an error occured");
    } finally {
      history.push("/my/dashboard");
    }
  };

  return (
    <div className="w-screen h-screen">
      <Spinner display={true} />
    </div>
  );
};

export default Verify;
