import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import cookie from "react-cookies";
import { Input, TextField } from "@material-ui/core";
export class HomepageHeader extends Component {
  state = {
    anchorEl: null,
    search: "",
  };

  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleTextChange = (event, key) => {
    this.setState({
      [key]: event.currentTarget.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    window.location.href = "/search?keyword=" + this.state.search;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.title}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CERTIX
            </Typography>
            {cookie.load("ACCESS_TOKEN") !== undefined && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
          <Toolbar className={classes.contentToolbar}>
            <Typography variant="h2" className={classes.helloBeauty}>
              Book Your Concert!
            </Typography>
            <form
              onSubmit={this.handleSearch}
              style={{ width: "1000px", maxWidth: "100%" }}
            >
              <TextField
                fullWidth
                value={this.state.search}
                color="secondary"
                className={classes.textField}
                label="Search Concert / Streamer"
                type="text"
                onChange={(event) => {
                  this.handleTextChange(event, "search");
                }}
                inputProps={{
                  className: classes.input,
                }}
              />
            </form>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: "white",

    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    fontFamily: "Equinox",
    flexGrow: 1,
  },
  contentToolbar: {
    color: "white",

    padding: theme.spacing(1),
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  helloBeauty: {
    fontFamily: "Hello Beauty",
  },
});
export default withStyles(useStyles)(HomepageHeader);
