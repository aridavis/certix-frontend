import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { ItemContainer } from "../homepage/item/ItemContainer";

export class SearchStreamer extends Component {
  renderDataContainer = (title, type, data) => {
    return (
      <div className={this.props.classes.dataContainer}>
        <ItemContainer type={type} data={data}></ItemContainer>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return <div>{this.renderDataContainer("", "streamer", streamerData)}</div>;
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

const useStyles = (theme) => ({
  dataContainer: {
    margin: theme.spacing(5),
  },
});
export default withStyles(useStyles)(SearchStreamer);
