import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import AuthHome from "./pages/Auth-Home/Auth-Home";

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
    <Redirect to="/accounts/new" />
  );
};

const GuestGuardedRoute = ({ path, exact, children }) => {
  return !isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Switch>
        <AuthGuardedRoute path="/dashboard">
          <AuthHome />
        </AuthGuardedRoute>
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
