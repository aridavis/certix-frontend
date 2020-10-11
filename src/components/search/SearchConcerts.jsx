import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { ItemContainer } from "../homepage/item/ItemContainer";
import Concert from "../../models/Concert";

export class SearchConcerts extends Component {
  state = {
    concerts: [],
  };

  componentWillMount() {
    Concert.Get(this.props.keyword).then((res) => {
      this.setState({
        concerts: res.data,
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
    const data = this.state.concerts.map((res) =>
      createConcertData(res.id, res.name, res.seller.name, res.price)
    );

    const { classes } = this.props;

    return <div>{this.renderDataContainer("", "concert", data)}</div>;
  }
}

const createConcertData = (id, name, streamer, price) => {
  return { id: id, name: name, streamer: streamer, price: price };
};

const useStyles = (theme) => ({
  dataContainer: {
    margin: theme.spacing(5),
  },
});
export default withStyles(useStyles)(SearchConcerts);
