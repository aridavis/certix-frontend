import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import VideoPlayer from "react-video-js-player";
import ReactHlsPlayer from "react-hls-player";
import Axios from "axios";
export class Video extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <ReactHlsPlayer
        style={{ width: "100%", height: "800px" }}
        url={
          "https://rtmp.certix.suhanginta-hermanudin.xyz/" +
          this.props.source +
          ".m3u8"
        }
        autoplay={true}
        controls={true}
        width={500}
        height={375}
      />
    );
  }
}

const useStyles = (theme) => ({});
export default withStyles(useStyles)(Video);
