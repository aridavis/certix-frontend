import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { ItemContainer } from "../homepage/item/ItemContainer";

export class SearchConcert extends Component {
  renderDataContainer = (title, type, data) => {
    return (
      <div className={this.props.classes.dataContainer}>
        <ItemContainer type={type} data={data}></ItemContainer>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return <div>{this.renderDataContainer("", "concert", concertData)}</div>;
  }
}

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
  dataContainer: {
    margin: theme.spacing(5),
  },
});
export default withStyles(useStyles)(SearchConcert);
