import React, { Component } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import cookie from "react-cookies";
import concert2 from "../../assets/images/concert2.jpg";

import User from "../../models/User";
import { DatePicker } from "@material-ui/pickers";
import Axios from "axios";
import Swal from "sweetalert2";

const moment = require("moment");

export class Register extends Component {
  state = {
    email: "",
    name: "",
    phone_number: "",
    dob: moment(new Date()).format("YYYY-MM-DD"),
    password: "",
    confirmation_password: "",
    gender: "",
  };

  handleTextChange = (event, key) => {
    this.setState({
      [key]: event.currentTarget.value,
    });
  };

  handleDateChange = (date, key) => {
    this.setState({
      [key]: moment(date).format("YYYY-MM-DD"),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_API_URL + "/users/register", this.state)
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        try {
          if (error.response !== undefined) {
            if (error.response.status === 401) {
              Swal.fire("Not Authorized", "", "warning").then((res) => {
                window.location = "/login";
              });
            } else {
              var message = "";
              var idx = 0;
              for (const [, value] of Object.entries(
                error.response.data.message
              )) {
                value.forEach((res) => {
                  if (idx !== 0) message += "<br>";
                  message += res;
                  idx++;
                });
              }
              message = message.replaceAll(" id ", " ");
              Swal.fire("Error", message, "error");
            }
          }
        } catch (ex) {
          if (error.response.status !== undefined) {
            Swal.fire(
              `Error ${error.response.status}`,
              error.response.statusText,
              "error"
            );
          } else {
            Swal.fire("Error", ex.toString(), "error");
          }
        }
      });
  };

  renderDatePicker = (data) => (
    <DatePicker
      fullWidth
      className={this.props.classes.textField}
      value={this.state[data.name]}
      label={data.label}
      onChange={(date) => {
        this.handleDateChange(date, data.name);
      }}
    />
  );

  renderInput = (data) => {
    if (data.type === "date") {
      return this.renderDatePicker(data);
    } else if (data.type === "select") {
      return this.renderSelect(data);
    }
    return this.renderTextField(data);
  };

  renderSelect = (data) => (
    <FormControl className={this.props.classes.input} fullWidth>
      <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
      <Select
        value={this.state[data.name]}
        onChange={(event) => {
          this.setState({ [data.name]: event.target.value });
        }}
      >
        <MenuItem value={""}></MenuItem>
        <MenuItem value={"M"}>Male</MenuItem>
        <MenuItem value={"F"}>Female</MenuItem>
      </Select>
    </FormControl>
  );

  renderTextField = (data) => (
    <TextField
      fullWidth
      value={this.state[data.name]}
      className={this.props.classes.textField}
      type={data.type}
      label={data.label}
      onChange={(event) => {
        this.handleTextChange(event, data.name);
      }}
      inputProps={{
        className: this.props.classes.input,
      }}
    />
  );

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Grid container className={[classes.formContainer, classes.dfjccaic]}>
            <Typography className={classes.title} variant="h3">
              Register Certix
            </Typography>
            {fields.map((res) => this.renderInput(res))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
              style={{ marginTop: "20px" }}
              href="#contained-buttons"
            >
              Register
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundImage: `url(${concert2})`,
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

const createField = ({ name, label, type, values = undefined }) => {
  return { name, label, type };
};

const fields = [
  createField({ name: "name", label: "Name", type: "text" }),
  createField({
    name: "gender",
    label: "Gender",
    type: "select",
  }),
  createField({ name: "email", label: "Email", type: "email" }),
  createField({ name: "phone_number", label: "Phone Number", type: "text" }),
  createField({ name: "dob", label: "Date of Birth", type: "date" }),
  createField({ name: "password", label: "Password", type: "password" }),
  createField({
    name: "confirmation_password",
    label: "Confirmation Password",
    type: "password",
  }),
];

export default withStyles(useStyles)(Register);
