import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

export const LoginSuccess = () => {
    const  [user, setUser] = useState()
    const history = useHistory()

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("In Login Success, user exist")
            // console.log(user)
            // setUser(user)
        } else {
            console.log("In Login Success, user DOES NOT exist")
        }
    })

    const handleLogout = () => {
        auth.signOut()
        history.push('/signin')
    }

    return (
        <div>
            Login Succeeded!
            <p><Link to="/signin">back to signin</Link></p>
            <button onClick={handleLogout}>Log Out</button>

        </div>
    )
}
