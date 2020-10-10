import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import History from './components/history/History'
import LoggedInRoute from './components/routes/LoggedInRoute'
import NotLoggedInRoute from "./components/routes/NotLoggedInRoute"
import Homepage from './components/homepage/Homepage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <LoggedInRoute exact path="/history" Component={History}/>
        <NotLoggedInRoute exact path="/register" Component={Register}/>
        <NotLoggedInRoute exact path="/login" Component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
