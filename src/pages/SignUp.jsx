import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db, FirebaseTimestamp } from "../firebase/index";
import {AuthContext} from '../App'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  label: {
    color: "Yello",
    backgroundColor: "red"
  }
})

// ---------------GET USERS COLLECTION FROM FIRESTORE---------------
const userRef = db.collection('users')

const SignUp = () => {
  const classes = useStyles()
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

        // Data to be set to firestore
        const userInitialData = {
          created_at: timestamp,
          email: email,
          isSignedIn: true,
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
        userRef.doc(uid).set(userInitialData) //uidをドキュメント名に指定してデータベースにsetした---

        alert("Signed Up Successfully!")

        // console.log("user, uid");
        // console.log(user); // Im objectが入ってる
        // console.log(user.uid); // 勝手に生成される文字列が入ってる
      })
    } catch (error) {
      // alert(error);
      console.log(error)
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmitSignup}>
        {/* <label> */}
        <InputLabel margin="dense" className={classes.label}>
          First name
          {/* <input
            name="lastname"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          /> */}
          <TextField id="standard-basic" label="First Name" />
        {/* </label> */}
        </InputLabel>
          <br/>
        {/* <label> */}
        <InputLabel margin="dense" className={classes.label}>
          Last name
          {/* <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          /> */}
          <TextField id="standard-basic" label="Last Name" />
        {/* </label> */}
        </InputLabel>
        <br/>
        {/* <label> */}
        <InputLabel margin="dense" className={classes.label}>
          Email
          {/* <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputEmail}
          /> */}
          <TextField id="standard-basic" label="Email" />
        {/* </label> */}
        </InputLabel>
        <br/>
        {/* <label> */}
        <InputLabel margin="dense" className={classes.label}>
          Password
          {/* <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputPassword}
          /> */}
          <TextField id="standard-basic" label="Password" />
        {/* </label> */}
        </InputLabel>
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
