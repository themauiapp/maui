import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { RESENDVERIFICATIONEMAIL } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { notifySuccess, notifyError } from "../../services/notify";
import { AppContext } from "../../contexts/AppContext";
import AuthHomeSidebar from "../../components/AuthHomeSidebar/AuthHomeSidebar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import Spinner from "../../components/Spinner/Spinner";

const AuthHome = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [resendVerificationEmailMutation] = useMutation(
    RESENDVERIFICATIONEMAIL
  );

  const resendVerificationEmail = async () => {
    const variables = { id: user.id };
    setLoading(true);
    try {
      await resendVerificationEmailMutation({ variables });
      notifySuccess("email resent successfully");
    } catch (error) {
      notifyError("an error occured");
    }
  };

  const toggleSpinner = () => {
    setLoading(!loading);
  };

  return (
    <div className="w-screen min-h-screen grid grid-cols-12">
      <div className="col-span-2">
        <AuthHomeSidebar />
      </div>
      <div className="col-span-10" style={{ background: "rgba(0,0,0,0.006)" }}>
        {!user.email_verified_at && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img
              src="/images/auth-home/balloons.svg"
              alt="balloons"
              style={{ height: "300px" }}
              className="mb-6"
            />
            <p className="w-1/2 leading-7 mb-4 text-center">
              Welcome to Maui {user.name.split(" ")[1]}. We sent a verification
              link to your email. Click that link to complete the signup process
              and you can get started keeping track of your expenses. If you did
              not receive the link, simply click{" "}
              <i
                onClick={() => {
                  resendVerificationEmail();
                }}
                className="cursor-pointer underline"
              >
                resend
              </i>{" "}
              to get it.
            </p>
          </div>
        )}
        {user.email_verified_at && (
          <AuthHomeContext.Provider value={{ toggleSpinner }}>
            <Header />
            <div className=" px-24">
              <Switch>
                <Route path="/my/dashboard">
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </AuthHomeContext.Provider>
        )}
      </div>

      <div className=" fixed bottom-0 right-0 mb-8 mr-8 rounded-full w-16 h-16 flex justify-center items-center bg-revolver-purple text-white">
        <i className="fas fa-coins"></i>
      </div>
      <Spinner display={loading} />
    </div>
  );
};

export default AuthHome;
