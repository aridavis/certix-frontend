import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/login/Login'
import NotLoggedInRoute from "./components/routes/NotLoggedInRoute";

function App() {
  return (
    <Router>
      <Switch>
        <NotLoggedInRoute exact path="/login" Component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
