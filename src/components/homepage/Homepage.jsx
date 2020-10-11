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
import ApiClient from "../../services/ApiClient";
import Axios from "axios";

export class Homepage extends Component {
  state = {
    topConcerts: [],
    concerts: [],
    topStreamers: [],
    streamers: [],
  };

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

  componentWillMount() {
    Axios.get(process.env.REACT_APP_API_URL + "/homepage").then((res) => {
      console.log(res.data);
      this.setState({
        topStreamers: res.data.top_sellers,
        topConcerts: res.data.top_concerts,
        streamers: res.data.sellers,
        concerts: res.data.concerts,
      });
    });
  }

  mapStateToConcert = (arr) => {
    const data = arr.map((res) =>
      createConcertData(res.id, res.name, res.seller.name, res.price)
    );
    return data;
  };

  mapStateToStreamer = (arr) => {
    const data = arr.map((res) => createStreamerData(res.id, res.name));
    return data;
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
            this.mapStateToConcert(this.state.topConcerts)
          )}
          {this.renderDataContainer(
            "Find Out Other Concert",
            "concert",
            this.mapStateToConcert(this.state.concerts)
          )}
          {this.renderDataContainer(
            "Top Streamer",
            "streamer",
            this.mapStateToStreamer(this.state.topStreamers)
          )}
          {this.renderDataContainer(
            "Find Out Other Streamer",
            "streamer",
            this.mapStateToStreamer(this.state.streamers)
          )}
        </Container>
      </div>
    );
  }
}

const createConcertData = (id, name, streamer, price) => {
  return { id: id, name: name, streamer: streamer, price: price };
};
const createStreamerData = (id, name) => {
  return { id: id, name: name };
};

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
