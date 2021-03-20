import React, { useContext, useState } from "react";
import {Link, useHistory} from 'react-router-dom'

import { auth, db } from "../firebase/index";
import { AuthContext } from "../App";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useContext(AuthContext)
  
  const userRef = db.collection('users')
  const history = useHistory()

  const handleInputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  };

  const handleInputPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  };

  // sign in
  // if successful, set isAuth true and redirect to LoginSuccess page
  // if not, stay on the page
  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password).then((result) =>  {


      auth.onAuthStateChanged( async (user) => {
        if (user) {
          console.log("USER EXIST")
          console.log("result: ", result)
          console.log("result.user: ", result.user) // --> uidとemailくらいしか使えそうなのない。uidで判別すればいいのか

          const uid = await userRef.doc(result.user.uid).get()
          console.log("From databese: ", uid.id)
          console.log("From databese: ", uid.data()) // --> 自分が設定したオブジェクトが入ってる
          setIsAuth(true)
          history.push('/loggedin')
        } else {
          console.log('NOOOOOOOOOOT')
        }
      })
      
    }).catch((error) => {
      console.log(error)
      console.log("USER DOES NOT EXIST");
      history.push('/signin')
    })
  }
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuth(true)
      console.log("------user exist", isAuth)
    } else {
      console.log("------user DOES NOT exist yet", isAuth)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setEmail('')
    setPassword('')
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("In Sign In, user exist")
    } else {
      console.log("in Sign In, user DOEA NOT exist")
    }
  })

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
    </div>
  );
};

// export default withRouter(SignIn);
export default SignIn;
