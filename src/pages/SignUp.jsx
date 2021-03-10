import React, { useState } from "react";
import { auth, db, FirebaseTimestamp } from "../firebase/index";

const userRef = db.collection('users')

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputEmail = (e) => {
    const inputEmail = e.target.value
    console.log(`Email: ${e.target.value}`)
    setEmail(inputEmail)
    console.log(`email: ${email}`)
  }

  const handleInputPassword = (e) => {
    const inputPassword = e.target.value
    console.log(`Pssword: ${e.target.value}`)
    setPassword(inputPassword)
    console.log(`password: ${password}`)
  }

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    // console.log(`--Email: ${email} :: Password: ${password}--`)
    signup(email, password);
    setEmail('')
    setPassword('')
  };
  
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    // console.log(`--Email: ${email} :: Password: ${password}--`)
    login(email, password);
    setEmail('')
    setPassword('')
  };

  const signup = async (email, password) => {
    const emailInput = email;
    const passwordInput = password;
    console.log(`${emailInput} :: ${passwordInput}`);
    
    try {
      await auth.createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(async (result) => {
        const user = result.user;
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        const userInitialData = {
          created_at: timestamp,
          email: email,
          uid: uid,
          updated_at: timestamp,
        }

        // console.log(`uid: ${uid}`)
        userRef.doc(uid).set(userInitialData) //uidを指定してデータベースにsetした---

        alert("Signed Up Successfully!")

        console.log("user, uid");
        console.log(user); // Im objectが入ってる
        console.log(user.uid); // 勝手に生成される文字列が入ってる
      })
    } catch (error) {
      // alert(error);
      console.log(error)
    }
  };
  
  const login = async (email, password) => {
    const emailInput = email;
    const passwordInput = password;
    
    try {
      await auth.signInWithEmailAndPassword(emailInput, passwordInput)
      .then((result) => {
        const user = result.user
        
        console.log(result)
        console.log("user, uid");
        console.log(user);  // Im objectが入ってる
        console.log(user.uid);  // 勝手に生成される文字列が入ってる
        auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("User exist:")
            console.log(user)
          } else {
            console.log("User DOES NOT exist")
          }
        })
        })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmitSignup}>
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
      <h1>Log in</h1>
      <form onSubmit={handleSubmitLogin}> 
      <label>
        First name
        <input
          name="email"
          type="text"
          placeholder="First Name"
          onChange
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
    </div>
  );
};

export default SignUp;
