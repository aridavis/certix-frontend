import React, { Component } from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";

import cookie from "react-cookies";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import NavigationDrawer from "../navigation-drawer/NavigationDrawer";
import User from "../../models/User";
import Swal from "sweetalert2";
import ApiClient from "../../services/ApiClient";

export class HomepageHeader extends Component {
  state = {
    anchorEl: null,
    search: this.props.text !== undefined ? this.props.text : "",
    drawerOpen: false,
    wallet: "0",
    name: "",
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

  toggleDrawer(value) {
    this.setState({
      drawerOpen: value,
    });
  }

  componentWillMount() {
    ApiClient.Get("/profile").then((res) => {
      this.setState({
        name: res.data.name,
      });
    });
    this.refreshWallet();
  }

  refreshWallet = () => {
    if (cookie.load("ACCESS_TOKEN") !== undefined) {
      User.Wallet().then((res) => {
        this.setState({
          wallet: res.data.balance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        });
      });
    }
  };

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

  addWallet = () => {
    Swal.fire({
      title: "Enter amount of cash",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return ApiClient.Post("/wallet", { value: value })
          .then((res) => {
            this.refreshWallet();
            return res.data;
          })

          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationDrawer
          open={this.state.drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
        />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.title}
              edge="start"
              onClick={() => {
                this.toggleDrawer(true);
              }}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              CERTIX
            </Typography>
            <form onSubmit={this.handleSearch}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={this.state.search}
                  onChange={(event) => this.handleTextChange(event, "search")}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </form>
            <div className={classes.grow}></div>
            {cookie.load("ACCESS_TOKEN") !== undefined && (
              <div>
                <span style={{ color: "white" }}>{this.state.name}</span>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="white"
                  onClick={this.addWallet}
                >
                  <AccountBalanceWalletIcon style={{ marginRight: 10 }} />
                  <Typography variant="button">
                    Rp {this.state.wallet}
                  </Typography>
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="white"
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
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  appBar: {
    backgroundColor: "black",
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "Equinox",
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    color: "white",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    color: "white",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});
export default withStyles(useStyles)(HomepageHeader);
