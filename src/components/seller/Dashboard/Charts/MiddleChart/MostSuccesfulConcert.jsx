import React, { Component } from "react";
import { Divider, Paper, Typography, withStyles } from "@material-ui/core";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const randomMC = require("random-material-color");

export class MostSuccesfulConcert extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Paper elevation={2} className={classes.root}>
        <Typography variant="h6">Most Successful Concert</Typography>
        <Divider></Divider>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={this.props.data} fill="#8884d8" dataKey="value" label>
              {this.props.data.map((res) => (
                <Cell fill={randomMC.getColor()}></Cell>
              ))}
            </Pie>
            <Tooltip></Tooltip>
            <Legend></Legend>
          </PieChart>
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
export default withStyles(useStyles)(MostSuccesfulConcert);
