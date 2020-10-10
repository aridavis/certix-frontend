import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie'

function NotLoggedInRoute({Component, ...rest}) {
    const [cookies, setCookie] = useCookies(["access_token"])

    function getRedirected() {
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} render={(props) => (
            Object.keys(cookies).length === 0 && cookies.constructor === Object ? <Component {...props}/> : getRedirected()
        )}/>
    )
}

export default NotLoggedInRoute
