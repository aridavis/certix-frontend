import React, { Component } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const randomedStreamer = [
  "https://source.unsplash.com/1600x900?singer",
  "https://source.unsplash.com/1600x900?vocalist",
  "https://source.unsplash.com/1600x900?band",
  "https://source.unsplash.com/1600x900?concert",
  "https://source.unsplash.com/1600x900?orchestra",
  "https://source.unsplash.com/1600x900?violin",
  "https://source.unsplash.com/1600x900?music",
  "https://source.unsplash.com/1600x900?church",
  "https://source.unsplash.com/1600x900?jazz",
];

export class Item extends Component {
  renderStreamerCard = () => {
    const { classes, data } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              randomedStreamer[
                Math.floor(Math.random() * randomedStreamer.length)
              ]
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View Streamer
          </Button>
        </CardActions>
      </Card>
    );
  };

  renderConcertCart = () => {
    const { classes, data } = this.props;

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              randomedStreamer[
                Math.floor(Math.random() * randomedStreamer.length)
              ]
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Streamer : {data.streamer}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={this.props.type === "concert" ? "concert/" + data.id : "#"}>
            <Button size="small" color="primary">
              Watch
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  };

  render() {
    return (
      <div>
        {this.props.type === "concert"
          ? this.renderConcertCart()
          : this.renderStreamerCard()}
      </div>
    );
  }
}

const useStyles = (theme) => ({
  media: {
    height: 300,
  },
});
export default withStyles(useStyles)(Item);
