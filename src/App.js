import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/accounts/new">
            <Auth />
        </Route>
        <Route path="/session/new">
            <Auth />
        </Route>
        <Route path="/">
            <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
