import React, { Component } from "react";
import { Container, Paper, withStyles } from "@material-ui/core";
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

export class SellerSellingPage extends Component {
  state = {
    genres: [],
  };
  componentWillMount() {
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
      <React.Fragment>
        <Header />
        <Container>
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
        </Container>
      </React.Fragment>
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
  { id: "start_time", label: "Start Time", type: "text" },
  { id: "status", label: "Status", type: "text" },
  { id: "created_at", label: "Created At", type: "text" },
  { id: "updated_at", label: "Updated At", type: "text" },
];

export default withStyles(useStyles)(SellerSellingPage);
