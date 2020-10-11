import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import User from "../../models/User";

export class NavigationDrawer extends Component {
  logout = () => {
    User.Logout()
      .then((res) => {
        cookie.remove("ACCESS_TOKEN");
        window.location.href = "/login";
      })
      .catch((err) => {
        cookie.remove("ACCESS_TOKEN");
        window.location.href = "/login";
      });
  };

  render() {
    const { classes } = this.props;
    const pages = [
      createPages("Home", "/", classes),
      createPages("Referrals", "/referrals", classes),
      createPages("History", "/history", classes),
      createPages("Seller", "/sellings", classes),
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
          <div className={classes.grow}></div>
          <List>
            {cookie.load("ACCESS_TOKEN") === undefined ? (
              createPages("Login", "/login", this.props.classes)
            ) : (
              <Link onClick={this.logout} className={classes.listItem}>
                <ListItem button key={"Logout"}>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              </Link>
            )}
          </List>
        </div>
      </SwipeableDrawer>
    );
  }
}

const createPages = (name, url, classes) => {
  return (
    <Link to={url} className={classes.listItem}>
      <ListItem button key={name}>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
};

const useStyles = (theme) => ({
  list: {
    width: 250,
    height: "100vh",
    flexDirection: "column",
    display: "flex",
  },
  fullList: {
    width: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  listItem: {
    textDecoration: "none",
    color: "#ffffff",
  },
});
export default withStyles(useStyles)(NavigationDrawer);
