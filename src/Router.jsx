import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import {SignIn, SignUp} from "./pages/index";
import { LoginSuccess } from "./pages/LoginSuccess";
import Page404 from './pages/Page404'

import AuthContentProvider from './pages/AuthContext'

const Router = () => {

  return (
    <AuthContentProvider>
      <Switch>
        <Route exact path="(/)?" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/404" component={Page404} />

        <Auth>
          {/* <Switch> */}
            <Route exact path="/loggedin" component={LoginSuccess} />
          {/* </Switch> */}
        </Auth>
      </Switch>
    </AuthContentProvider>
  );
};

export default Router;
