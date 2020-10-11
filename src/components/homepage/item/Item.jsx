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
import image from "../../../assets/images/concert.jpg";

export class Item extends Component {
  renderStreamerCard = () => {
    const { classes, data } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.rollingstone.com/wp-content/uploads/2020/03/ConcertCrowd.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {data.rating} / 5.0
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
            image="https://i.guim.co.uk/img/media/ad98f2dc808f18131e35e59c05ba6212671e8227/94_0_3061_1838/master/3061.jpg?width=620&quality=85&auto=format&fit=max&s=b72df2817ace7d67acf0a1ff9c218a03"
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
          <Button size="small" color="primary">
            Book Now
          </Button>
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
    height: 140,
  },
});
export default withStyles(useStyles)(Item);
