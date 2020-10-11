import { Paper, Typography } from "@material-ui/core";

import React, { Component } from "react";
import {
  Tooltip,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/deepOrange";

export class ThisYearIncome extends Component {
  mapPropsToData = () => {
    const arr = [];
    this.props.data.forEach((res) => {
      arr.push(createData(res.month, res.Income));
    });
    return arr;
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={2} className={classes.root}>
        <Typography variant="h6">
          Total Income in {new Date().getFullYear()}
        </Typography>
        <ResponsiveContainer>
          <LineChart
            data={this.mapPropsToData()}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis></YAxis>
            <Line
              type="monotone"
              dataKey="Income"
              stroke={green[700]}
              strokeWidth={5}
              dot={true}
            />

            <Legend></Legend>
            <Tooltip></Tooltip>
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}

function createData(month, Income) {
  return { month, Income };
}

const useStyles = (theme) => ({
  root: {
    width: "96%",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    height: 400,
  },
});

export default withStyles(useStyles)(ThisYearIncome);
