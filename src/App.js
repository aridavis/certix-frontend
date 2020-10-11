import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register.jsx";
import History from "./components/history/History";
import LoggedInRoute from "./components/routes/LoggedInRoute";
import NotLoggedInRoute from "./components/routes/NotLoggedInRoute";
import Homepage from "./components/homepage/Homepage.jsx";
import { green, red, teal } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ApplyStreamer from "./components/apply-streamer/ApplyStreamer";
import SellerSelling from "./components/seller/SellerSellingPage";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: teal[300],
    },
    secondary: {
      main: red[400],
    },
    typography: {
      fontFamily: ["Gilmer"],
    },
  },
});

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <LoggedInRoute exact path="/history" Component={History} />
            <NotLoggedInRoute exact path="/register" Component={Register} />
            <NotLoggedInRoute exact path="/login" Component={Login} />
            <LoggedInRoute
              exact
              path="/apply-streamer"
              Component={ApplyStreamer}
            />
            <LoggedInRoute exact path="/sellings" Component={SellerSelling} />
          </Switch>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
