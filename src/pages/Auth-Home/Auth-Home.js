import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
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
import Income from "../../components/Income/Income";
import Analytics from "../../components/Analytics/Analytics";
import Profile from "../../components/Profile/Profile";
import Search from "../../components/Search/Search";
import Spinner from "../../components/Spinner/Spinner";
import AddIncome from "../../components/AddIncome/AddIncome";
import UpdateIncome from "../../components/UpdateIncome/UpdateIncome";
import Expense from "../../components/Expense/Expense";
import AddExpense from "../../components/AddExpense/AddExpense";
import UpdateExpense from "../../components/UpdateExpense/UpdateExpense";
import SearchDialog from "../../components/SearchDialog/SearchDialog";
import VerifyResetEmail from "../../components/VerifyResetEmail/VerifyResetEmail";
import "./AuthHome.css";
import Overlay from "../../components/Overlay/Overlay";

const AuthHome = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const determineIncomeState = () => {
    const dt = new Date();
    const month = months[dt.getMonth()];
    const year = dt.getFullYear();
    const currentPeriod = `${month} ${year}`;
    if (!user.latest_income) {
      return true;
    }
    const {
      latest_income: { period },
    } = user;
    const latestPeriod = `${period.month} ${period.year}`;
    return currentPeriod !== latestPeriod;
  };
  const [dialogs, setDialogs] = useState({
    addIncome: determineIncomeState(),
    updateIncome: false,
    viewExpense: false,
    addExpense: false,
    updateExpense: false,
    search: false,
    verifyResetEmail: false,
  });
  const [viewedExpense, setViewedExpense] = useState(null);
  const [expense, setExpense] = useState(null);
  const [lastUpdatedExpense, setLastUpdatedExpense] = useState(null);
  const [showReloadPage, setShowReloadPage] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [resendVerificationEmailMutation] = useMutation(
    RESENDVERIFICATIONEMAIL
  );
  const location = useLocation();

  const resendVerificationEmail = async () => {
    const variables = { id: user.id };
    setLoading(true);
    try {
      await resendVerificationEmailMutation({ variables });
      notifySuccess("Email Resent Successfully");
    } catch (error) {
      notifyError("Failed to Connect to API");
    }
  };

  const closeDialog = () => {
    const { addIncome } = dialogs;

    if (addIncome) {
      if (determineIncomeState()) {
        return;
      }
    }

    setDialogs({
      addIncome: false,
      updateIncome: false,
      viewExpense: false,
      addExpense: false,
      updateExpense: false,
    });
  };

  const toggleSpinner = (loadingState = null) => {
    if (loadingState !== null) {
      setLoading(loadingState);
      return;
    }
    setLoading(!loading);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    setShowReloadPage(false);
    setReloadPage(false);
    setLastUpdatedExpense(null);
  }, [location]);

  const reloadView = () => {
    setReloadPage(true);
    setTimeout(() => {
      setReloadPage(false);
      setLastUpdatedExpense(null);
    }, 1500);
    setShowReloadPage(false);
  };

  useEffect(() => {
    window.document.addEventListener("keydown", focusSearch);
  }, []);

  const focusSearch = (e) => {
    if (window.screen.width < 1024) return;
    if (e.code === "Slash") {
      const searchInput = window.document.getElementById("searchInput");
      searchInput.focus();
    }
  };

  return (
    <div className="w-screen min-h-screen flex">
      <div className={`auth-home__sidebar ${sidebar ? "active" : ""}`}>
        <AuthHomeSidebar toggle={toggleSidebar} />
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
              value={{
                toggleSpinner,
                dialogs,
                setDialogs,
                setViewedExpense,
                setExpense,
                lastUpdatedExpense,
                setLastUpdatedExpense,
                setShowReloadPage,
                reloadPage,
              }}
            >
              <Header toggleSidebar={toggleSidebar} />
              <div className="px-8 bmd:px-16 lg:px-20">
                <Switch>
                  <Route path="/my/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/my/expenses">
                    <Expenses />
                  </Route>
                  <Route path="/my/income">
                    <Income />
                  </Route>
                  <Route path="/my/analytics">
                    <Analytics />
                  </Route>
                  <Route path="/my/profile">
                    <Profile />
                  </Route>
                  <Route path="/my/search/:searchTerm">
                    <Search />
                  </Route>
                </Switch>
              </div>
              <Overlay active={sidebar} setActive={setSidebar} width={1025} />
              <div
                onClick={closeDialog}
                className={`transition-opacity duration-500 ease-in fixed top-0 left-0 w-screen h-screen flex justify-center items-center ${
                  Object.values(dialogs).includes(true)
                    ? "opacity-100 z-50"
                    : "opacity-0 z--9999"
                }`}
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                {dialogs.addIncome && <AddIncome />}
                {dialogs.updateIncome && <UpdateIncome />}
                {dialogs.viewExpense && <Expense name={viewedExpense} />}
                {dialogs.addExpense && <AddExpense />}
                {dialogs.updateExpense && <UpdateExpense expense={expense} />}
                {dialogs.search && <SearchDialog />}
                {dialogs.verifyResetEmail && <VerifyResetEmail />}
              </div>
            </AuthHomeContext.Provider>
          </>
        )}
      </div>

      {user.email_verified_at && (
        <>
          <div
            onClick={() => {
              if (loading) {
                return;
              }
              setDialogs({ ...dialogs, addExpense: true });
            }}
            className="fixed bottom-0 right-0 cursor-pointer z-20 mb-6 mr-6 bsm:mb-8 bsm:mr-8 rounded-full w-16 h-16 flex justify-center items-center bg-revolver-purple text-white"
          >
            {loading ? (
              <Spinner display={true} fixed={false} alt={true} />
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </div>
          <div
            className={`fixed bottom-0 left-0 mb-8 transition-opacity duration-300 ease-in flex w-64 ml-10 p-5 shadow bg-white ${
              showReloadPage ? "z-10 opacity-100" : "z--9999 opacity-0"
            }`}
            style={{ fontSize: "14.5px" }}
          >
            <i className="fas fa-info-circle text-revolver-purple text-xl mt-1 mr-4"></i>
            <div className="flex flex-col">
              <p className="mb-2">This page was updated</p>
              <p
                onClick={reloadView}
                className="relative font-semibold cursor-pointer"
                style={{ left: "2px" }}
              >
                Reload
              </p>
            </div>
          </div>
        </>
      )}
      {!user.email_verified_at && <Spinner display={loading} />}
    </div>
  );
};

export default AuthHome;
