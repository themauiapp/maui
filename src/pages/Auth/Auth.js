import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import Footer from "../../components/Footer/Footer";
import "./Auth.css";

const Auth = () => {
  const [signup, setSignup] = useState(
    window.location.pathname === "/accounts/new"
  );

  const [signupError, setSignupError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const signupFormTop = () => {
    const width = window.screen.width;

    if (width > 576) {
      return "-25%";
    } else if (width > 385) {
      return "-20%";
    } else if (width > 360) {
      return "-25%";
    }

    return "-27.5%";
  };

  const signupFormMarginBottom = () => {
    if (window.screen.width > 576) {
      return "mb-20";
    }

    if (window.screen.height > 800) {
      return "mb-0";
    }

    if (window.screen.height > 700) {
      return "mb-32";
    }

    return "mb-32";
  };

  return (
    <div className="w-screen">
      <div
        className={signupError ? `auth ${signupFormMarginBottom()}` : "auth"}
      >
        <div className="h-2/6 sm:h-3/7 lg:h-2/6 px-8 sm:px-12 md:px-24 pt-8 md:pt-6 w-full bg-light-grey">
          <div className="flex justify-between md:items-center">
            <div className="flex nunito text-lg nav__home">
              <Link to="/">Maui</Link>
              <p className="mx-1">|</p>
              {signup ? (
                <Link
                  onClick={() => {
                    setSignup(!signup);
                    setSignupError(false);
                  }}
                  to="/session/new"
                >
                  Login
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    setSignup(!signup);
                  }}
                  to="/accounts/new"
                >
                  Signup
                </Link>
              )}
            </div>
            <div className="invisible">
              <Button type="outlined">Login</Button>
            </div>
          </div>
        </div>
        <div className="h-4/6 sm:h-1/2 lg:h-4/6 px-8 sm:px-12 md:px-24 flex justify-between lg:justify-around">
          <div className="hidden bmd:block auth__image-parent relative w-1/3 lg:w-1/4">
            <img
              src="/images/auth/woman-standing.jpg"
              className="object-cover w-full h-full"
              alt="woman smiling"
            />
          </div>
          <div
            className="auth__form relative w-full bmd:w-1/2 lg:w-1/3 bg-white h-fc"
            style={{
              top: signup ? signupFormTop() : "-10%",
            }}
          >
            <Switch>
              <Route exact path="/accounts/new">
                <Signup setError={setSignupError} />
              </Route>
              <Route exact path="/session/new">
                <Login />
              </Route>
              <Route path="/password/reset/:token">
                <ResetPassword />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
