import React, { Component } from "react";
import { AppBar, Container, Tab, Tabs, withStyles } from "@material-ui/core";
import Header from "../header/Header";
import queryString from "query-string";
import { TabPanel } from "@material-ui/lab";
import SearchStreamer from "./SearchStreamer";
import SearchConcert from "./SearchConcerts";
export class Search extends Component {
  state = {
    value:
      queryString.parse(this.props.location.search).tab !== undefined &&
      queryString.parse(this.props.location.search).tab !== ""
        ? parseInt(queryString.parse(this.props.location.search).tab)
        : 0,
  };

  handleTabChange = (event, value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    const { classes } = this.props;
    console.log(
      parseInt(queryString.parse(this.props.location.search).tab) !== NaN
    );
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
        {this.state.value === 0 && (
          <SearchStreamer
            keyword={queryString.parse(this.props.location.search).keyword}
          />
        )}
        {this.state.value === 1 && (
          <SearchConcert
            keyword={queryString.parse(this.props.location.search).keyword}
          />
        )}
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
