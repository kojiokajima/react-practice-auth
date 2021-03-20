import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import {SignIn, SignUp} from "./pages/index";
import { LoginSuccess } from "./pages/LoginSuccess";
import Page404 from './pages/Page404'

// export const AuthContext = createContext(false, () => {})

const Router = () => {
  
  // const [isAuth, setIsAuth] = useState(false)
  // console.log("Route.jsx -- isAuth is set to false")

  return (
    // <AuthContext.Provider value={[isAuth, setIsAuth]}>
    
      <Switch>
        <Route exact path="(/)?" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/404" component={Page404} />

        {/* accessable only when the user is authenticated */}
        <Auth>
            <Route exact path="/loggedin" component={LoginSuccess} />
        </Auth>

      </Switch>
    // </AuthContext.Provider>
  );
};

export default Router;
