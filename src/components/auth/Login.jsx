import React, { Component } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import cookie from "react-cookies";
import concert from "../../assets/images/concert.jpg";

import User from "../../models/User";
import { Link } from "react-router-dom";
export class Login extends Component {
  state = {
    email: "",
    password: "",
    remember_me: false,
  };

  handleTextChange = (event, key) => {
    this.setState({
      [key]: event.currentTarget.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    User.Login(this.state).then((res) => {
      cookie.save("ACCESS_TOKEN", res.data.access_token, {
        path: "/",
        expires: this.state.remember_me ? new Date(res.data.expires_at) : null,
      });
      this.props.history.push("/");
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleLogin}>
          <Grid container className={[classes.formContainer, classes.dfjccaic]}>
            <Typography className={classes.title} variant="h3">
              Login Certix
            </Typography>
            <TextField
              fullWidth
              value={this.state.email}
              className={classes.textField}
              label="Email"
              onChange={(event) => {
                this.handleTextChange(event, "email");
              }}
              inputProps={{
                className: classes.input,
              }}
            />
            <TextField
              fullWidth
              value={this.state.password}
              className={classes.textField}
              label="Password"
              type="password"
              onChange={(event) => {
                this.handleTextChange(event, "password");
              }}
              inputProps={{
                className: classes.input,
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  fullWidth
                  checked={this.state.remember_me}
                  onChange={(_, val) => {
                    this.setState({ remember_me: val });
                  }}
                />
              }
              style={{ width: "100%", color: "white" }}
              label="Remember Me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleLogin}
              style={{ marginTop: "20px" }}
              href="#contained-buttons"
            >
              Login
            </Button>
            <span style={{ color: "white", marginTop: "10px" }}>
              Don't have account?{" "}
              <Link to="register" style={{ color: "white" }}>
                Register
              </Link>
            </span>
          </Grid>
        </form>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundImage: `url(${concert})`,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    paddingBottom: 0,

    margin: "10px 0px",
    fontWeight: 500,
  },
  input: {
    color: "white",
  },

  formContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 400,
    padding: 20,
  },
  dfjccaic: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 30,
    color: "white",
    fontFamily: "Equinox",
  },
});
export default withStyles(useStyles)(Login);
