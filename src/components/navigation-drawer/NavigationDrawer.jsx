import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";
import { Link } from 'react-router-dom'

export class NavigationDrawer extends Component {

  render() {
    const { classes } = this.props;
    const pages = [
      createPages("Home", "/", classes),
      createPages('Referrals', '/referrals', classes),
      createPages('History', '/history', classes)
    ];

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

const createPages = (name, url, classes) => {
  return (
    <Link to={url} className={classes.listItem}>
      <ListItem
        button
        key={name}
      >
        <ListItemText primary={name} />
      </ListItem>
      </Link>
  );
};

const useStyles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  listItem: {
    textDecoration: 'none',
    color: '#ffffff'
  }
});
export default withStyles(useStyles)(NavigationDrawer);
