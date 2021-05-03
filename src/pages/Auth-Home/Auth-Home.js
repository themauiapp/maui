import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { RESENDVERIFICATIONEMAIL } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { notifySuccess, notifyError } from "../../services/notify";
import { AppContext } from "../../contexts/AppContext";
import { months } from "../../utilities/date";
import AuthHomeSidebar from "../../components/AuthHomeSidebar/AuthHomeSidebar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import Expenses from "../../components/Expenses/Expenses";
import Spinner from "../../components/Spinner/Spinner";
import AddIncome from "../../components/AddIncome/AddIncome";
import Expense from "../../components/Expense/Expense";
import "./AuthHome.css";

const AuthHome = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const determineIncomeState = () => {
    const dt = new Date();
    const month = months[dt.getMonth()];
    const year = dt.getFullYear();
    const currentPeriod = `${month} ${year}`;
    return user.latest_income_period !== currentPeriod;
  };
  const [dialogs, setDialogs] = useState({
    income: determineIncomeState(),
    expense: false,
  });
  const [expense, setExpense] = useState(null);
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

  const closeDialog = () => {
    const { income } = dialogs;

    if (income) {
      if (determineIncomeState()) {
        return;
      }
    }

    setDialogs({ income: false, expense: false });
  };

  const toggleSpinner = () => {
    setLoading(!loading);
  };

  return (
    <div className="w-screen min-h-screen flex">
      <div className="auth-home__sidebar">
        <AuthHomeSidebar />
      </div>
      <div className="auth-home__main bg-light-grey">
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
          <>
            <AuthHomeContext.Provider
              value={{ toggleSpinner, setDialogs, setExpense }}
            >
              <Header />
              <div className="px-24">
                <Switch>
                  <Route path="/my/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/my/expenses">
                    <Expenses />
                  </Route>
                </Switch>
              </div>
            </AuthHomeContext.Provider>
            <div
              onClick={closeDialog}
              className={`transition-opacity duration-500 ease-in fixed top-0 left-0 w-screen h-screen flex justify-center items-center ${
                dialogs.expense || dialogs.income
                  ? "opacity-100 z-50"
                  : "opacity-0 z--9999"
              }`}
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              {dialogs.income && <AddIncome />}
              {dialogs.expense && <Expense name={expense} />}
            </div>
          </>
        )}
      </div>

      {user.email_verified_at && (
        <div className=" fixed bottom-0 right-0 cursor-pointer mb-8 mr-8 rounded-full w-16 h-16 flex justify-center items-center bg-revolver-purple text-white">
          <i className="fas fa-plus"></i>
        </div>
      )}
      <Spinner display={loading} />
    </div>
  );
};

export default AuthHome;
