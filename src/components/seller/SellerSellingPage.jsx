import React, { Component } from "react";
import {
  AppBar,
  Container,
  Paper,
  Tab,
  Tabs,
  withStyles,
} from "@material-ui/core";
import CustomTable from "../custom-table/CustomTable";
import {
  CreateAutoComplete,
  CreateDateField,
  CreateDateTimeField,
  CreateSelect,
  CreateTextField,
} from "../../utils/FilterFormItem";
import SellerSelling from "../../models/SellerSelling";
import Genre from "../../models/Genre";
import Header from "../header/Header";
import Dashboard from "./Dashboard/Dashboard";

export class SellerSellingPage extends Component {
  state = {
    genres: [],
    value: 0,
    isValidated: false,
  };

  handleTabChange = (event, value) => {
    this.setState({
      value: value,
    });
  };
  componentWillMount() {
    SellerSelling.ValidateSeller().then((res) => {
      console.log(res.data);
      if (res.data === 1) {
        this.setState({
          isValidated: true,
        });
      } else {
        window.location.href = "/apply-streamer";
      }
    });

    Genre.Get({}).then((res) => {
      this.setState({
        genres: res.data,
      });
    });
  }

  render() {
    const addFormAttributes = [
      CreateTextField("name", "Concert Name", "text"),
      CreateDateTimeField("start_time", "Start Time", "datetime"),
      CreateTextField("price", "Price", "number"),

      CreateAutoComplete(
        "genre",
        "genre",
        "Genre",
        this.state.genres,
        "name",
        false
      ),
    ];
    return (
      this.state.isValidated && (
        <React.Fragment>
          <Header />

          <AppBar position="static">
            <Tabs
              style={{ backgroundColor: "black", color: "white" }}
              value={this.state.value}
              onChange={this.handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Dashboard" />
              <Tab label="Concerts" />
            </Tabs>
          </AppBar>
          {this.state.value === 1 && (
            <Paper>
              <CustomTable
                model={SellerSelling}
                title="Seller Sellings"
                headCells={headCells}
                filterForm={filterForm}
                addFormAttributes={addFormAttributes}
                updateFormAttributes={updateFormAttributes}
              ></CustomTable>
            </Paper>
          )}

          {this.state.value === 0 && <Dashboard />}
        </React.Fragment>
      )
    );
  }
}

const filterForm = [
  CreateTextField("id", "ID", "text"),
  CreateTextField("name", "Name", "text"),
  CreateSelect("status", "Status", [
    { text: "All", value: "all" },
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
  ]),
];

const updateFormAttributes = [
  CreateTextField("name", "Name", "text"),
  CreateDateField("start_time", "Start Time", "text"),
  CreateSelect("status", "Status", [{ text: "cancelled", value: "Cancel" }]),
];

const useStyles = (theme) => ({});

const headCells = [
  { id: "id", label: "ID", type: "text" },
  { id: "name", label: "Name", type: "text" },
  { id: "price", label: "Price", type: "text" },
  { id: "start_time", label: "Start Time", type: "text" },
  { id: "stream_key", label: "Streaming Key", type: "text" },
  { id: "created_at", label: "Created At", type: "text" },
  { id: "updated_at", label: "Updated At", type: "text" },
];

export default withStyles(useStyles)(SellerSellingPage);
