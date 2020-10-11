import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { ItemContainer } from "../homepage/item/ItemContainer";
import Streamer from "../../models/Streamer";

export class SearchStreamer extends Component {
  state = {
    streamers: [],
  };

  componentWillMount() {
    Streamer.Get(this.props.keyword).then((res) => {
      this.setState({
        streamers: res.data,
      });
    });
  }

  renderDataContainer = (title, type, data) => {
    return (
      <div className={this.props.classes.dataContainer}>
        <ItemContainer type={type} data={data}></ItemContainer>
      </div>
    );
  };

  render() {
    const data = this.state.streamers.map((res) =>
      createStreamerData(res.id, res.name)
    );

    const { classes } = this.props;

    return <div>{this.renderDataContainer("", "streamer", data)}</div>;
  }
}

const createStreamerData = (id, name) => {
  return { id: id, name: name };
};

const useStyles = (theme) => ({
  dataContainer: {
    margin: theme.spacing(5),
  },
});
export default withStyles(useStyles)(SearchStreamer);
