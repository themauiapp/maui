import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Signup from "../../components/Signup/Signup";

const Auth = () => (
  <div className="w-screen h-screen">
    <div className="h-2/6 px-24 pt-8 w-full bg-light-grey">
      <div className="flex justify-between items-center">
        <Link to="/" className="nunito text-lg">
          Maui
        </Link>
        <div className="invisible">
          <Button>Maui</Button>
        </div>
      </div>
    </div>
    <div className="h-4/6 px-24 pb-10 flex justify-around">
      <div className="relative w-1/4" style={{ top: "-10%", height: "380px" }}>
        <img
          src="/images/auth/woman-standing.jpg"
          className="object-cover w-full h-full"
          alt="woman smiling"
          style={{ height: "380px", transform: "rotate(0deg)" }}
        />
      </div>
      <div
        className="relative w-1/3 p-10 bg-white shadow"
        style={{ top: "-25%", height: "120%" }}
      >
        <Router>
          <Switch>
            <Route path="/accounts/new">
              <Signup />
            </Route>
            <Route path="/session/new">login</Route>
          </Switch>
        </Router>
      </div>
    </div>
  </div>
);

export default Auth;
