import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Draggable from "react-draggable";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export class UpdateDataDialog extends Component {
  state = {
    attributes: [],
  };

  constructor(props) {
    super(props);
    this.props.model.Show(this.props.id).then((res) => {
      const data = res.data;
      const stateData = {};
      this.props.attributes.forEach((attr) => {
        stateData[attr.name] = data[attr.name];
      });
      stateData.attributes = this.props.attributes;
      this.setState(stateData);
    });
  }

  handleInputChange = (event, key) => {
    this.setState({
      [key]: event.currentTarget.value,
    });
  };

  handleSelectChange = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  renderMediaContainer = () => {
    const { classes } = this.props;
    return (
      <div className={classes.mediaContainer}>
        <img
          alt={this.state.thumbnail_path}
          src={SERVER_URL + this.state.thumbnail_path}
          className={classes.img}
        ></img>
      </div>
    );
  };

  renderThumbnail = (data) => {
    return (
      <FormControl variant="outlined" fullWidth>
        <FormHelperText style={{ margin: 0 }}>{data.label}</FormHelperText>
        {this.renderMediaContainer()}
      </FormControl>
    );
  };
  renderTextField = (data) => {
    return (
      <TextField
        className={this.props.classes.input}
        value={this.state[data.name]}
        label={data.label}
        type={data.type}
        multiline={data.type === "multiline"}
        onChange={(event) =>
          data.enabled && this.handleInputChange(event, data.name)
        }
        fullWidth
      ></TextField>
    );
  };

  handleDateChange = (date, key) => {
    this.setState({
      [key]: moment(date).format("YYYY-MM-DD"),
    });
  };

  renderDatePicker = (data) => {
    return (
      <DatePicker
        className={this.props.classes.input}
        fullWidth
        label="Start Date"
        minDate={new Date(2019, 7, 1)}
        value={new Date(this.state[data.name])}
        onChange={(date) => this.handleDateChange(date, data.name)}
        animateYearScrolling
      />
    );
  };

  renderSelect = (data) => {
    return (
      <FormControl
        style={{ width: "100%" }}
        className={this.props.classes.input}
      >
        <InputLabel>{data.label}</InputLabel>
        <Select
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
        options={data.data}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={data.label} />
        )}
      />
    );
  };

  renderFileInput = (data) => {
    return (
      <TextField
        className={this.props.classes.input}
        value={this.state[data.name]}
        label={data.label}
        variant="outlined"
        type="file"
        onChange={(event) => this.handleInputChange(event, data.name)}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      ></TextField>
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
      case "file":
        return this.renderFileInput(res);
      case "date":
        return this.renderDatePicker(res);
      case "thumbnail":
        return this.renderThumbnail(res);
      default:
        return "";
    }
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleUpdate = () => {
    this.props.model
      .Put(this.props.id, this.state)
      .then((res) => {
        this.handleClose();
        Swal.fire("Success Updating Data!", "", "success");
      })
      .catch((err) => {
        this.props.onClose();
      });
  };

  handleDelete = () => {
    this.props.model
      .Delete(this.props.id)
      .then((res) => {
        this.handleClose();
        Swal.fire("Success Deleting Data!", "", "success");
      })
      .catch((err) => {
        this.props.onClose();
      });
  };

  handleUserReset = () => {
    if (this.props.isUser) {
      this.props.model
        .Reset(this.props.id)
        .then((res) => {
          this.handleClose();
          Swal.fire("Success Resetting User!", "", "success");
        })
        .catch((err) => {
          this.props.onClose();
        });
    }
  };

  draggablePaperComponent = (props) => {
    return (
      <Draggable handle="#title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };

  render() {
    return (
      <Dialog
        PaperComponent={this.draggablePaperComponent}
        open={this.props.open}
        modal={true}
        onClose={this.handleClose}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle id="title" className={this.props.classes.title}>
          {this.props.title + " - " + this.props.id}
        </DialogTitle>
        <DialogContent>
          {this.state.attributes.map((res) => this.renderFormItem(res))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="default">
            Cancel
          </Button>
          {this.props.isUser === true ? (
            <Button onClick={this.handleUserReset} color="secondary">
              Reset
            </Button>
          ) : (
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          )}

          <Button onClick={this.handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const useStyles = (theme) => ({
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mediaContainer: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  title: {
    cursor: "move",
  },
});
export default withStyles(useStyles)(UpdateDataDialog);
