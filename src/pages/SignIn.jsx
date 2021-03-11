import React, { useState } from "react";
import {Link, withRouter, Redirect, useHistory} from 'react-router-dom'

import { auth } from "../firebase/index";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false)

  const history = useHistory()

  const handleInputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  };

  const handleInputPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(email, password)
    setEmail('')
    setPassword('')
  }

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then((result) => {
        const user = result.user;

        console.log(result);
        console.log("user, uid");
        console.log(user); // Im objectが入ってる
        console.log(user.uid); // 勝手に生成される文字列が入ってる
        
        
        auth.onAuthStateChanged((user) => {
          if (user) {
            alert("user exist")
            console.log("---------------")
            console.log("User exist:");
            console.log(user); // Im objectが入ってる
            console.log(auth.currentUser);
            history.push('/loggedin')
            // <Redirect to='/loggedin' />

            history.push('/loggedin')

          } else {
            console.log("User DOES NOT exist");
          }
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  const redirectToSignUp = () => {
    // console.log("Clicked")
    // <Redirect to="/singup" />
    history.push('/')
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputEmail}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputPassword}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
      <br/><br/>
      <p>
        <Link to="/">don't have an account?</Link>
      </p>
      <p onClick={redirectToSignUp}>Redirect</p>
    </div>
  );
};

export default withRouter(SignIn);
