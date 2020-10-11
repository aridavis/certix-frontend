import React, { Component } from "react";
import { AppBar, Container, Tab, Tabs, withStyles } from "@material-ui/core";
import Header from "../header/Header";
import queryString from "query-string";
import { TabPanel } from "@material-ui/lab";
import SearchStreamer from "./SearchStreamer";
import SearchConcert from "./SearchConcerts";
export class Search extends Component {
  state = {
    value: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header text={queryString.parse(this.props.location.search).keyword} />
        <AppBar position="static">
          <Tabs
            style={{ backgroundColor: "black", color: "white" }}
            value={this.state.value}
            onChange={this.handleTabChange}
            aria-label="simple tabs example"
          >
            <Tab label="Streamer" />
            <Tab label="Concert" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <SearchStreamer />}
        {this.state.value === 1 && <SearchConcert />}
      </React.Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
  },
});
export default withStyles(useStyles)(Search);
