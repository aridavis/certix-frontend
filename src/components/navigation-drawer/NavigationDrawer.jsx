import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";

export class NavigationDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <SwipeableDrawer
        anchor="left"
        open={this.props.open}
        onClose={this.props.onClose}
        onOpen={this.props.onOpen}
      >
        <div className={classes.list}>
          <List>{pages.map((x) => x)}</List>
        </div>
      </SwipeableDrawer>
    );
  }
}

const createPages = (name, url) => {
  return (
    <ListItem
      button
      key={name}
      onClick={() => {
        window.location.href = url;
      }}
    >
      <ListItemText primary={name} />
    </ListItem>
  );
};

const pages = [createPages("Home", "/")];

const useStyles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
export default withStyles(useStyles)(NavigationDrawer);
