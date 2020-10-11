import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

export class AriVideo extends Component {
  state = {
    available: false,
  };

  validateSession = () => {
    Axios.post(process.env.REACT_APP_API_URL + "/concerts/validation/session", {
      cookie: cookie.load("WATCH_COOKIE"),
      token: cookie.load("WATCH_TOKEN"),
    }).then((res) => {
      if (res.data === 1) {
        this.setState({
          canWatch: true,
        });
      }
    });
  };

  render() {
    const { source, start_time, id } = this.props;
    const { classes } = this.props;

    return <div></div>;
  }
}

const useStyles = (theme) => ({});
export default withStyles(useStyles)(AriVideo);
