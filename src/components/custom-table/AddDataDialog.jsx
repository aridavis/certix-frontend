import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Draggable from "react-draggable";

export class AddDataDialog extends Component {
  componentWillMount() {
    this.props.data.forEach((res) => {
      this.setState({
        [res.name]:
          res.type === "number"
            ? 0
            : res.type === "date"
            ? moment(new Date()).format("YYYY-MM-DD")
            : res.type === "datetime"
            ? moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            : "",
      });
    });
  }

  resetState = () => {
    this.props.data.forEach((res) => {
      this.setState({
        [res.name]: res.type === "number" ? 0 : "",
      });
    });
  };

  handleInputChange = (event, key) => {
    this.setState({
      [key]: event.currentTarget.value,
    });
  };

  handleMediaFileChange = (fileId, thumbnailPath) => {
    this.setState({
      media_id: fileId,
      thumbnail_path: thumbnailPath,
    });
  };

  handleSelectChange = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleDateChange = (date, key) => {
    this.setState({
      [key]: moment(date).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  renderTextField = (data) => {
    return (
      <TextField
        className={this.props.classes.input}
        value={this.state[data.name]}
        label={data.label}
        type={data.type}
        multiline={data.type === "multiline"}
        disabled={data.enabled === false}
        onChange={(event) => this.handleInputChange(event, data.name)}
        fullWidth
      ></TextField>
    );
  };

  renderDateTimePicker = (data) => {
    return (
      <DateTimePicker
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
    console.log(data);
    return (
      <Autocomplete
        multiple={data.multiple === true}
        options={data.values}
        value={this.state[data.model]}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
          const val = value === null ? undefined : value.id;
          this.setState({
            [data["name"]]: val,
            [data["model"]]: val,
          });
        }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={data.label} />
        )}
      />
    );
  };

  handleOpenMediaDialog = () => {
    this.setState({
      isChoosingMedia: true,
    });
  };

  handleCloseMediaDialog = () => {
    this.setState({
      isChoosingMedia: false,
    });
  };

  renderMediaContainer = () => {
    const { classes } = this.props;
    return (
      <div
        className={classes.mediaContainer}
        onClick={() => {
          this.setState({ isChoosingMedia: true });
        }}
      >
        {this.state.media_id === undefined || this.state.media_id === "" ? (
          <Typography variant="h6">No media is selected</Typography>
        ) : (
          <img
            alt={this.state.thumbnail_path}
            src={this.state.thumbnail_path}
            className={classes.img}
          ></img>
        )}
      </div>
    );
  };

  renderMediaInput = (data) => {
    return (
      <FormControl variant="outlined" fullWidth>
        <FormHelperText style={{ margin: 0 }}>{data.label}</FormHelperText>
        {this.renderMediaContainer()}
      </FormControl>
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
      case "media_file":
        return this.renderMediaInput(res);
      case "date":
        return this.renderDatePicker(res);
      case "datetime":
        return this.renderDateTimePicker(res);
      default:
        return "";
    }
  };

  handleClose = () => {
    this.resetState();
    this.props.onClose();
  };

  handleSubmit = () => {
    this.props.model
      .Post(this.state)
      .then((res) => {
        Swal.fire("Success Adding Data!", "", "success");

        this.handleClose();
      })
      .catch((err) => {
        this.props.onClose();
      });
  };

  draggablePaperComponent = (props) => {
    return (
      <Draggable handle="#title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Dialog
          PaperComponent={this.draggablePaperComponent}
          open={this.props.open}
          modal={true}
          onClose={this.handleClose}
          fullWidth
          maxWidth={"sm"}
        >
          <DialogTitle className={classes.title} id="title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            {this.props.data.map((res) => this.renderFormItem(res))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const useStyles = (theme) => ({
  title: {
    cursor: "move",
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mediaContainer: {
    width: "100%",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
  label: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  img: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
});
export default withStyles(useStyles)(AddDataDialog);
