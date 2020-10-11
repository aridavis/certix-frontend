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

export class MostPopularGenre extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={2} className={classes.root}>
        <Typography variant="h6">Most Popular Genre</Typography>
        <Divider></Divider>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={this.props.data}
              innerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              label
            >
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
export default withStyles(useStyles)(MostPopularGenre);
