import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase/index";
import {AuthContext} from '../App'

const Auth = (props) => {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [isSignInCheck, setIsSignInCheck] = useState(false);
  const [isAuth, setIsAuth] = useContext(AuthContext)

  console.log("In Auth");
  console.log("props: ", props);
  console.log("props.children: ", props.children);
  console.log("props.currentuser: ", props.currentuser);


  if(isAuth) {
    return props.children
  } else {
    return <Redirect to='/404' />
  }

  // useEffect( async () => {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log("In onAuth----------")
    //     console.log(user);
    //     setIsSignedIn(true);
    //     setIsSignInCheck(true);
    //   } else {
    //     console.log("NOOOOOOOOOOOOOOO")
    //   }
    // });
  // }, []);

  // console.log(isSignedIn)

  // if (isSignedIn) {
  //   // return props.children;
  //   return <h2>yo</h2>;
  // } else {
  //   return <Redirect to="/404" />;
  // }
};

export default Auth;
