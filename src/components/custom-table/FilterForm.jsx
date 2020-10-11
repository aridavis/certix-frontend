import React, { Component } from "react";
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";

export class FilterForm extends Component {
  state = {};

  componentWillMount() {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    this.props.filterForm.forEach((res) => {
      this.setState({
        [res.name]:
          res.type === "number"
            ? 0
            : res.type === "date" && res.name === "end_date"
            ? new Date()
            : res.type === "date" && res.name === "start_date"
            ? startOfMonth
            : "",
      });
    });
  }
  handleInputChange = (event, key) => {
    const text = event.currentTarget.value;
    this.setState({
      [key]: text,
    });
  };

  handleSelectChange = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleDateChange = (date, key) => {
    this.setState({
      [key]: date,
    });
  };

  renderDatePicker = (data) => {
    return (
      <DatePicker
        label={data.label}
        minDate={new Date(2019, 7, 1)}
        value={this.state[data.name]}
        onChange={(date) => this.handleDateChange(date, data.name)}
        animateYearScrolling
      />
    );
  };

  renderTextField = (data) => {
    return (
      <TextField
        value={this.state[data.name]}
        label={data.label}
        type={data.type}
        onChange={(event) => this.handleInputChange(event, data.name)}
        fullWidth
      ></TextField>
    );
  };

  renderSelect = (data) => {
    return (
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state[data.name]}
          onChange={(event) => this.handleSelectChange(data.name, event)}
        >
          {data.values.map((res) => (
            <MenuItem value={res.value.toString()}>{res.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  renderAutoComplete = (data) => {
    return (
      <Autocomplete
        multiple
        id="tags-standard"
        options={data.data}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={data.label} />
        )}
      />
    );
  };

  renderFormItem = (res) => {
    switch (res.field_type) {
      case "textfield":
        return this.renderTextField(res);
      case "select":
        return this.renderSelect(res);
      case "autocomplete":
        return this.renderAutoComplete(res);
      case "date":
        return this.renderDatePicker(res);
      default:
        return "";
    }
  };

  handleCloseFilter = () => {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    this.props.filterForm.forEach((res) => {
      this.setState({
        [res.name]:
          res.type === "number"
            ? 0
            : res.type === "date" && res.name === "end_date"
            ? new Date()
            : res.type === "date" && res.name === "start_date"
            ? startOfMonth
            : "",
      });
    });

    this.props.onClose();
  };

  handleApplyFilter = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { classes, filterForm } = this.props;

    return (
      <Collapse in={this.props.open}>
        <form action="" onSubmit={() => {}}>
          <Grid container spacing={3} className={classes.filterContainer}>
            {filterForm.map((res) => (
              <Grid item xs={12} md={2}>
                {this.renderFormItem(res)}
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} style={{ paddingLeft: 12 }}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleApplyFilter}
                type="submit"
              >
                Apply
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={this.handleCloseFilter}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    );
  }
}

const useStyles = (theme) => ({
  filterContainer: {
    padding: theme.spacing(2),
  },
});
export default withStyles(useStyles)(FilterForm);
