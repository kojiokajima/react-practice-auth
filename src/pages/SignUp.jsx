import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db, FirebaseTimestamp } from "../firebase/index";
import {AuthContext} from '../App'

// ---------------GET USERS COLLECTION FROM FIRESTORE---------------
const userRef = db.collection('users')

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSigneIn, setIsSignedIn] = useState(false)
  const [isAuth, setIsAuth] = useContext(AuthContext)

  const history = useHistory()

  const handleInputEmail = (e) => {
    const inputEmail = e.target.value
    // console.log(`Email: ${e.target.value}`)
    setEmail(inputEmail)
    // console.log(`email: ${email}`)
  }

  const handleInputPassword = (e) => {
    const inputPassword = e.target.value
    // console.log(`Pssword: ${e.target.value}`)
    setPassword(inputPassword)
    // console.log(`password: ${password}`)
  }

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    // console.log(`--Email: ${email} :: Password: ${password}--`)
    signup(email, password, firstName, lastName);
    setEmail('')
    setPassword('')
  };
  
  // const handleSubmitLogin = (event) => {
  //   event.preventDefault();
  //   // console.log(`--Email: ${email} :: Password: ${password}--`)
  //   login(email, password);
  //   setEmail('')
  //   setPassword('')
  // };

// ---------------SIGN UP---------------
  const signup = async (email, password, firstName, lastName) => {
    const emailInput = email;
    const passwordInput = password;
    
    try {
      await auth.createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(async (result) => {
        const user = result.user;
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        const userInitialData = {
          created_at: timestamp,
          email: email,
          name: {
            first_name: firstName,
            last_name: lastName
          },
          uid: uid,
          updated_at: timestamp,
        }

        setIsSignedIn(true)

        auth.onAuthStateChanged((user) => {
          if(user) {
            console.log("user created")
            setIsAuth(true)
            history.push('/loggedin')

          } else {
            console.log("user NOT created")
            history.push('/')
          }
        })

        // console.log(`uid: ${uid}`)
        userRef.doc(uid).set(userInitialData) //uid????????????????????????????????????set??????---

        alert("Signed Up Successfully!")

        // console.log("user, uid");
        // console.log(user); // Im object???????????????
        // console.log(user.uid); // ????????????????????????????????????????????????
      })
    } catch (error) {
      // alert(error);
      console.log(error)
    }
  };
  
  // ---------------SIGN IN---------------
  // const login = async (email, password) => {
  //   const emailInput = email;
  //   const passwordInput = password;
    
  //   try {
  //     await auth.signInWithEmailAndPassword(emailInput, passwordInput)
  //     .then((result) => {
  //       const user = result.user
        
  //       console.log(result)
  //       console.log("user, uid");
  //       console.log(user);  // Im object???????????????
  //       console.log(user.uid);  // ????????????????????????????????????????????????
  //       auth.onAuthStateChanged((user) => {
  //         if (user) {
  //           console.log("User exist:")
  //           console.log(user)
  //         } else {
  //           console.log("User DOES NOT exist")
  //         }
  //       })
  //       })
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmitSignup}>
        <label>
          First name
          <input
            name="lastname"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last name
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br/>
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
        <button type="submit">Sign Up</button>
      </form>
      <br/><br/>
      <p>
        <Link to='/signin'>Already have an account?</Link>
      </p>
    </div>
  );
};

export default SignUp;
