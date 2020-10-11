import React, { Component } from "react";
import { Container, Grid, withStyles } from "@material-ui/core";
import Item from "./Item";

export class ItemContainer extends Component {
  renderGrids = () => {
    var grids = [];
    var gridItems = [];
    for (let i = 0; i < this.props.data.length / 5; i++) {
      {
        this.props.data.slice(i * 5, i * 5 + 5).map((res) => {
          console.log(res);
          gridItems.push(
            <Grid item xs={12} lg>
              <Item type={this.props.type} data={res}></Item>
            </Grid>
          );
        });
        grids.push(gridItems);
        gridItems = [];
      }
    }

    return grids.map((res) => {
      console.log(res);
      return (
        <Grid container spacing={3} justify="center">
          {res.map((x) => x)}
        </Grid>
      );
    });
  };

  render() {
    const { classes } = this.props;

    return <div>{this.renderGrids()}</div>;
  }
}

const useStyles = (theme) => ({});
export default withStyles(useStyles)(ItemContainer);