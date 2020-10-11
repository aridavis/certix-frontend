import React, { Component } from "react";
import { Divider, Paper, Typography, withStyles } from "@material-ui/core";
import {
  CartesianGrid,
  BarChart,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const randomMC = require("random-material-color");

export class UpcomingTicketSold extends Component {
  mapPropsToData = () => {
    const arr = [];
    const x = {};

    this.props.data.forEach((res) => {
      x[res.name] = res.value;
    });
    arr.push(x);
    return arr;
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={2} className={classes.root}>
        <Typography variant="h6">Upcoming Concert Sold Ticket</Typography>
        <Divider></Divider>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.mapPropsToData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
            <Legend />
            {this.props.data.map((res) => (
              <Bar dataKey={res.name} fill={randomMC.getColor()}></Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    height: 400,
  },
});
export default withStyles(useStyles)(UpcomingTicketSold);
