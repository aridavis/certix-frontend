// import React, { useEffect } from 'react'
// import Hls from "hls.js"

// function Homepage() {
//     useEffect(() => {
//         if (Hls.isSupported()) {
//             var video = document.getElementById('video');
//             var videoSrc = 'https://rtmp.certix.suhanginta-hermanudin.xyz/test.m3u8';
//             if (Hls.isSupported()) {
//               var hls = new Hls();
//               hls.loadSource(videoSrc);
//               hls.attachMedia(video);
//               hls.on(Hls.Events.MANIFEST_PARSED, function () {
//                 video.play();
//               });
//             }

//           }
//     }, []);

//     return (
//         <div>
//             <video id="video"></video>
//         </div>
//     )
// }

// export default Homepage

import React, { Component } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import HomepageHeader from "./header/HomepageHeader";
import { ItemContainer } from "./item/ItemContainer";

export class Homepage extends Component {
  renderTitle = (name) => (
    <Grid
      container
      justify="space-between"
      className={this.props.classes.titleContainer}
    >
      <Typography
        variant="h5"
        color="secondary"
        className={this.props.classes.title}
      >
        {name}
      </Typography>
      <Button variant="outlined" color="secondary">
        Explore
      </Button>
    </Grid>
  );

  renderDataContainer = (title, type, data) => {
    return (
      <div className={this.props.classes.dataContainer}>
        {this.renderTitle(title)}
        <ItemContainer type={type} data={data}></ItemContainer>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <HomepageHeader />
        <Container>
          {this.renderDataContainer(
            "Bestselling Concert",
            "concert",
            concertData.slice(0, 5)
          )}
          {this.renderDataContainer(
            "Find Out Other Concert",
            "concert",
            concertData
          )}
          {this.renderDataContainer(
            "Top Streamer",
            "streamer",
            streamerData.slice(0, 5)
          )}
          {this.renderDataContainer(
            "Find Out Other Streamer",
            "streamer",
            streamerData
          )}
        </Container>
      </div>
    );
  }
}

const createStreamerData = (name, rating) => {
  return { name: name, rating: rating };
};

const streamerData = [
  createStreamerData("Poco poco", "3.0"),
  createStreamerData("Ayam Goreng", "3.0"),
  createStreamerData("Meong", "3.0"),
  createStreamerData("Cicak", "3.0"),
  createStreamerData("Hallo Bandung", "3.0"),
  createStreamerData("Poco poco", "3.0"),
  createStreamerData("Ayam Goreng", "3.0"),
  createStreamerData("Meong", "3.0"),
  createStreamerData("Cicak", "3.0"),
  createStreamerData("Hallo Bandung", "3.0"),
];

const createConcertData = (name, streamer, price) => {
  return { name: name, streamer: streamer, price: price };
};

const concertData = [
  createConcertData("Poco poco", "Ari", 50000),
  createConcertData("Ayam Goreng", "Ari", 50000),
  createConcertData("Meong", "Ari", 50000),
  createConcertData("Cicak", "Ari", 50000),
  createConcertData("Hallo Bandung", "Ari", 50000),
  createConcertData("Poco poco", "Ari", 50000),
  createConcertData("Ayam Goreng", "Ari", 50000),
  createConcertData("Meong", "Ari", 50000),
  createConcertData("Cicak", "Ari", 50000),
  createConcertData("Hallo Bandung", "Ari", 50000),
];

const useStyles = (theme) => ({
  title: {
    fontFamily: "Gilmer Bold",
  },
  titleContainer: {
    marginBottom: theme.spacing(1),
  },
  dataContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});
export default withStyles(useStyles)(Homepage);
