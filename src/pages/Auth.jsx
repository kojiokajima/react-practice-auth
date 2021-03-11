import React from 'react'
import {Redirect} from 'react-router-dom'

const Auth = (props) => {
    return (
        props.currentUser.isLoggedIn ? props.children : <Redirect to={'/loggedin'}/>
    )
}

export default Auth