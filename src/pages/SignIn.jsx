import React, { useContext, useState } from "react";
import {Link, withRouter, Redirect, useHistory} from 'react-router-dom'

import { auth } from "../firebase/index";
import { AuthContext } from "../App";
// import {login} from './Auth'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isAuth, setIsAuth] = useContext(AuthContext)

  const history = useHistory()

  const handleInputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  };

  const handleInputPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  };

  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).then((result) =>  {
      const user = result.user

      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("USER EXIST")
          setIsAuth(true)
          history.push('/loggedin')
        } else {
          console.log("USER DOES NOT EXIST");
        }
      })

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // ----------------------------------
    login(email, password)
    // ----------------------------------
    // signIn(email, password)
    // login(email, password)
    setEmail('')
    setPassword('')
  }

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then( async (result) => {
        const user = result.user;

        console.log(result);
        console.log("user, uid");
        console.log(user); // Im objectが入ってる
        console.log(user.uid); // 勝手に生成される文字列が入ってる
        
        
        await auth.onAuthStateChanged((user) => {
          if (user) {
            alert("user exist")
            console.log("---------------")
            console.log("User exist:");
            console.log(user); // Im objectが入ってる
            console.log(auth.currentUser);
            history.push('/loggedin')
            // <Redirect to='/loggedin' />

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

  // const {isAuth, login} = (AuthContext)

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
      {/* <form onSubmit={login}> */}
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
      <br/><br/><br/><br/>


      {/* <div className="auth">
        <h2>ComponentA</h2>
        {isAuth ? (
          <h2>認証されました</h2>
        ) : (
          <>
            <h2>認証されてません</h2>
            <button onClick={login}>ログイン</button>
          </>
        )}
        <Link to="/">ComponentBへ</Link>
      </div> */}
    </div>
  );
};

// export default withRouter(SignIn);
export default SignIn;
