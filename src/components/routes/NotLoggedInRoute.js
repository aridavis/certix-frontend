import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie'

function NotLoggedInRoute({Component, ...rest}) {
    const [cookies, setCookie] = useCookies(["ACCESS_TOKEN"])

    function getRedirected() {
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} render={(props) => (
            !cookies.ACCESS_TOKEN ? <Component {...props}/> : getRedirected()
        )}/>
    )
}

export default NotLoggedInRoute