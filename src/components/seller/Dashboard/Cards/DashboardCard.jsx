import React, { Component } from "react";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
export class DashboardCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={2}>
        <Grid container className={classes.root}>
          <Grid
            item
            className={classes.iconContainer}
            style={{ backgroundColor: this.props.iconBackgroundColor }}
          >
            {this.props.icon}
          </Grid>
          <Grid item className={classes.textContainer}>
            <Typography variant="h5">{this.props.value}</Typography>
            <Typography variant="p">{this.props.description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    height: 100,
  },
  iconContainer: {
    width: 100,
    height: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  textContainer: {
    textAlign: "center",
    flex: 1,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default withStyles(useStyles)(DashboardCard);
