import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "universal-cookie";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import AuthHome from "./pages/Auth-Home/Auth-Home";
import Verify from "./pages/Verify/Verify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isAuthenticated = () => {
  const cookies = new Cookies();
  return cookies.get("user");
};

const AuthGuardedRoute = ({ path, exact, children }) => {
  return isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/session/new" />
  );
};

const GuestGuardedRoute = ({ path, exact, children }) => {
  return !isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/my/dashboard" />
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <AuthGuardedRoute path="/my">
          <AuthHome />
        </AuthGuardedRoute>
        <GuestGuardedRoute path="/google/login">
          <Verify />
        </GuestGuardedRoute>
        <Route path="/email/verify/:id/:hash">
          <Verify />
        </Route>
        <GuestGuardedRoute path="/accounts/new">
          <Auth />
        </GuestGuardedRoute>
        <GuestGuardedRoute path="/session/new">
          <Auth />
        </GuestGuardedRoute>
        <GuestGuardedRoute path="/">
          <Home />
        </GuestGuardedRoute>
      </Switch>
    </Router>
  );
}

export default App;
