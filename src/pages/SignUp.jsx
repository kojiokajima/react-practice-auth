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
    // backgroundColor: "red"
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
    <div className="signup">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmitSignup}>

        <div className="signup-name">
          <InputLabel margin="dense" className={classes.label} onChange={(e) => setFirstName(e.target.value)}>
            First name
            <TextField id="standard-basic" type="text" label="First Name" />
          </InputLabel>
            <br/>

          <InputLabel margin="dense" className={classes.label} onChange={(e) => setLastName(e.target.value)}>
            Last name
            <TextField id="standard-basic" type="text" label="Last Name" />
          </InputLabel>
        </div>

        <InputLabel margin="dense" className={classes.label} onChange={handleInputEmail}>
          Email
          <TextField id="standard-basic" type="email" label="Email" />
        </InputLabel>
        <br/>

        <InputLabel margin="dense" className={classes.label} onChange={handleInputPassword}> 
          Password
          <TextField id="standard-basic" type="password" label="Password" />
        </InputLabel>
        <br/>

        <button type="submit">Sign Up</button>
      </form>
      <br/>
      <p><Link to='/signin'>Already have an account?</Link></p>
    </div>
  );
};

export default SignUp;
