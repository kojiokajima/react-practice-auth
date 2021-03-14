import React, {useState, createContext} from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from '../firebase/index'

export const AuthContext = createContext()


const AuthContentProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false)
    const history = useHistory()

    const login = (email, password) => {
        auth.signInWithEmailAndPassword(email, password).then(async (result) => {
            const user = result.user

            await auth.onAuthStateChanged((user) => {
                if (user) {
                  alert("user exist")
                  console.log("---------------")
                  console.log("User exist:");
                  console.log(user); // Im objectが入ってる
                  console.log(auth.currentUser);

                  setIsAuth(true)
                  history.push('/loggedin')
                  console.log('isAuth: ', isAuth)
                  // <Redirect to='/loggedin' />
      
                } else {
                  console.log("User DOES NOT exist");
                }
              });
        })
    }

    return (
        <AuthContext.Provider value={{login, isAuth}}>
            {props.children}
        </AuthContext.Provider>
        
    )
}

export default AuthContentProvider