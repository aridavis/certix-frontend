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
import singer from "../../assets/images/singer.jpg";
import ApplySellerModel from "../../models/ApplyStreamer";
import { DatePicker } from "@material-ui/pickers";
import Axios from "axios";
import Swal from "sweetalert2";
import ApplyStreamerModel from "../../models/ApplyStreamer";

const moment = require("moment");

export class ApplyStreamer extends Component {
  state = {
    ic_number: "",
    name: "",
    description: "",
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

  resetState = () => {
    this.setState({
      ic_number: "",
      name: "",
      description: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    ApplyStreamerModel.Store(this.state).then((res) => {
      Swal.fire("", "Success Applying", "success").then(() => {
        this.resetState();
      });
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
      multiline={data.multiline}
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
              BECOME A STREAMER
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
              Apply Now
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
    backgroundImage: `url(${singer})`,
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

const createField = ({
  name,
  label,
  type,
  values = undefined,
  multiline = false,
}) => {
  return { name, label, type, values, multiline };
};

const fields = [
  createField({ name: "name", label: "Name", type: "text" }),
  createField({
    name: "ic_number",
    label: "Identity Card Number",
    type: "text",
  }),
  createField({
    name: "description",
    label: "Description",
    type: "text",
    multiline: true,
  }),
];

export default withStyles(useStyles)(ApplyStreamer);
