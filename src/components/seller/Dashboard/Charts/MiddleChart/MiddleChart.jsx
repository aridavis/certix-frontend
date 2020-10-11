import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";

import UpcomingTicketSold from "./UpcomingTicketSold";

import MostPopularGenre from "./MostPopularGenre";
import MostSuccesfulConcert from "./MostSuccesfulConcert";

export class MiddleChart extends Component {
  render() {
    return (
      <Grid container spacing={5} style={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <MostPopularGenre data={this.props.data.most_popular_genre} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MostSuccesfulConcert
            data={this.props.data.most_profit_genre}
          ></MostSuccesfulConcert>
        </Grid>
        <Grid item xs={12} lg={4}>
          <UpcomingTicketSold data={this.props.data.upcoming_total_sold} />
        </Grid>
      </Grid>
    );
  }
}

const useStyles = (theme) => ({});
export default withStyles(useStyles)(MiddleChart);
