import React from "react";
import { Route, Switch } from "react-router-dom";
import {SignIn, SignUp} from "./pages/index";
import { LoginSuccess } from "./pages/LoginSuccess";

const Router = () => {

  return (
      <Switch>
        <Route exact path="(/)?" component={SignUp} />
        <Route exact path="/signup" component={SignIn} />
        <Route exact path="/logedin" component={LoginSuccess} />
      </Switch>
  );
};

export default Router;
