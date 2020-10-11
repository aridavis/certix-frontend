import { Container, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Cards from "./Cards/Cards";
import MiddleChart from "./Charts/MiddleChart/MiddleChart";

import ThisYearIncome from "./Charts/ThisYearIncome";
import ApiClient from "../../../services/ApiClient";
export class Dashboard extends Component {
  state = {
    average_ratings: 2.7,
    incoming_concert: 1,
    sold_ticket: 0,
    total_engagement: 0,
    total_income: "0",
    popular_genres: [],
    profit_genre: [],
    this_year_profit: [],
    upcoming_sold_ticket: [],
  };

  componentWillMount() {
    ApiClient.Get("/sellers/dashboard").then((res) => {
      this.setState({
        average_ratings: res.data.average_ratings,
        incoming_concert: res.data.incoming_concert,
        sold_ticket: res.data.sold_ticket,
        total_income: res.data.total_income,
        popular_genres: res.data.popular_genres,
        profit_genre: res.data.profit_genre,
        this_year_profit: res.data.this_year_profit,
        upcoming_sold_ticket: res.data.upcoming_sold_ticket,
        total_engagement: res.data.total_engagement,
      });
    });
  }

  renderDivider = () => <div style={{ marginTop: 25, marginBottom: 25 }}></div>;

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Cards
          data={{
            average_ratings: this.state.average_ratings,
            incoming_concert: this.state.incoming_concert,
            sold_ticket: this.state.sold_ticket,
            total_engagement: this.state.total_engagement,
            total_income: this.state.total_income
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
          }}
        ></Cards>
        {this.renderDivider()}
        <MiddleChart
          data={{
            most_popular_genre: this.state.popular_genres,
            most_profit_genre: this.state.profit_genre,
            upcoming_total_sold: this.state.upcoming_sold_ticket,
          }}
        ></MiddleChart>
        {this.renderDivider()}

        <ThisYearIncome data={this.state.this_year_profit} />
      </div>
    );
  }
}

const useStyles = (theme) => ({
  dateDelimiter: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default withStyles(useStyles)(Dashboard);
