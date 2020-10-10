import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ApiClient from '../../services/ApiClient'
import { useCookies } from 'react-cookie'
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Certix
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#3D5597',
    '&:hover': {
      backgroundColor: '#68C0EA'
    }
  },
  button: {
    textAlign: 'center'
  }
}));

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  
  const [cookies, setCookie] = useCookies(["ACCESS_TOKEN"])
  const history = useHistory()

  function onChange(e) {
    setData({...data, [e.target.name]: e.target.value})
  }

  function login(e) {
    e.preventDefault()

    ApiClient.Post('/auth/login', data)
    .then(res => {
      setCookie('ACCESS_TOKEN', res.data.access_token)
      history.push('/')
    })
    .catch((err) => {
      Swal.fire(
        "Not Authorized",
        "Username / Passsword is Invalid.",
        "warning"
      );
    });
    // console.log('asd')
    // console.log(process.env.REACT_APP_BACKEND_URL)
    // axios({
    //   url: process.env.REACT_APP_BACKEND_URL + "/auth/login",
    //   method: "POST",
    //   data
    // })
    // .then(res => {
    //   console.log(res)
    // })
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container className={classes.button}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}