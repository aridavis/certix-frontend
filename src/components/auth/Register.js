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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormcontrolLabel'
import ApiClient from '../../services/ApiClient'
import { useHistory } from "react-router-dom";

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

export default function Register() {
  const classes = useStyles();
  const [data, setData] = useState({
    name: '',
    phone_number: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmation_password: ''
  })
  const history = useHistory()

  function onChange(e) {
    setData({...data, [e.target.name]: e.target.value})
  }

  function onSubmit(e) {
    e.preventDefault()

    ApiClient.Post('/users/register', data)
    .then(res => {
      history.push('/login')
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate  onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone-number"
            label="Phone Number"
            name="phone_number"
            autoComplete="phone-number"
            onChange={onChange}
          />
          <FormLabel component="legend">Date of Birth</FormLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dob"
            name="dob"
            autoComplete="dob"
            type="date"
            onChange={onChange}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" onChange={onChange}>
                <FormControlLabel value="F" control={<Radio />} label="Female" />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
            </RadioGroup>
        </FormControl>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmation_password"
            label="confirmation Password"
            type="password"
            id="confirmation-password"
            autoComplete="confirmation-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container className={classes.button}>
            <Link href="/login" variant="body2">
              {"Already have an account? Login"}
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