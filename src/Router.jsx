import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import {SignIn, SignUp} from "./pages/index";
import { LoginSuccess } from "./pages/LoginSuccess";

const Router = () => {

  return (
      <Switch>
        <Route exact path="(/)?" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />

        {/* <Auth> */}
          {/* <Switch> */}
            <Route exact path="/loggedin" component={LoginSuccess} />
          {/* </Switch> */}
        {/* </Auth> */}
      </Switch>
  );
};

export default Router;
