import React, { Component } from "react";
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import purple from "@material-ui/core/colors/deepPurple";

import AddDataDialog from "./AddDataDialog";

import UpdateDataDialog from "./UpdateDataDialog";

export class CustomTable extends Component {
  state = {
    open: false,
    page: 0,
    isFiltering: true,
    addFormAttributes: {},
    isOpeningAddForm: false,
    isOpeningUpdateForm: false,
    selectedId: undefined,
    data: [],
    tempFilter: {},
    totalData: 0,
    filter: { page: 0, orderBy: "id", order: "asc", rowsPerPage: 5 },
  };

  componentWillMount() {
    const filterData = {};
    const addFormAttributes = {};

    this.setState({
      tempFilter: filterData,
      addFormAttributes: addFormAttributes,
    });
    this.refreshData();
  }

  refreshData = () => {
    this.props.model.Get(this.state.filter).then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data,
        totalData: res.data.total_data,
      });
    });
  };

  renderToolbar = () => {
    const { classes } = this.props;
    return (
      <div style={{ width: "100%" }} className={classes.header}>
        <Typography variant="h5">{this.props.title}</Typography>

        {this.props.readOnly !== true && (
          <Button
            className={classes.button}
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              this.setState({
                isOpeningAddForm: true,
              });
            }}
          >
            Add
          </Button>
        )}
      </div>
    );
  };

  renderTableHead = () => {
    const { headCells } = this.props;
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel>{headCell.label}</TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  handleUpdateFormOpen = (id) => {
    this.setState({
      isOpeningUpdateForm: true,
      selectedId: id,
    });
  };

  handleUpdateFormClose = () => {
    this.setState({
      isOpeningUpdateForm: false,
      selectedId: undefined,
    });
  };

  renderTableData = () => {
    const { page, data } = this.state;
    console.log(data);
    const rowsPerPage = this.state.filter.rowsPerPage;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <TableBody>
        {this.state.data.map((row, index) => {
          const cells = [];
          this.props.headCells.forEach((element) => {
            cells.push(
              <TableCell align="left">
                {row[element.id] !== null ? (
                  element.type === "image" ? (
                    <img
                      alt={element.base_url + row[element.id]}
                      src={element.base_url + row[element.id]}
                      className={this.props.classes.thumbnail}
                    />
                  ) : (
                    row[element.id]
                  )
                ) : (
                  "-"
                )}
              </TableCell>
            );
          });

          return (
            <TableRow hover role="checkbox">
              {cells.map((res) => res)}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  };

  handleChangeRowsPerPage = (event) => {
    this.handleFilterChange(
      "page",
      0,
      this.handleFilterChange(
        "rowsPerPage",
        parseInt(event.target.value, 10),
        () => {
          this.refreshData();
        }
      )
    );
  };

  renderAddDialog = () => {
    return this.props.readOnly === true ? (
      ""
    ) : (
      <AddDataDialog
        model={this.props.model}
        onClose={() => {
          this.setState({
            isOpeningAddForm: false,
          });
        }}
        isMediaTransaction={this.props.isMediaTransaction}
        isUser={this.props.isUser}
        title={"Add " + this.props.title}
        open={this.state.isOpeningAddForm}
        data={this.props.addFormAttributes}
      ></AddDataDialog>
    );
  };

  renderUpdateDialog = () => {
    return this.state.isOpeningUpdateForm === false ||
      this.state.selectedId === undefined ||
      this.props.readOnly === true ? (
      ""
    ) : (
      <UpdateDataDialog
        model={this.props.model}
        onClose={() => {
          this.setState({
            isOpeningUpdateForm: false,
          });
        }}
        id={this.state.selectedId}
        isUser={this.props.isUser}
        isRoute={this.props.isRoute}
        title={"Update " + this.props.title}
        open={this.state.isOpeningUpdateForm}
        attributes={this.props.updateFormAttributes}
        isMediaTransaction={this.props.isMediaTransaction}
      ></UpdateDataDialog>
    );
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.isOpeningAddForm && this.renderAddDialog()}
        {this.state.isOpeningUpdateForm && this.renderUpdateDialog()}
        <Paper className={classes.paper}>
          {this.renderToolbar()}

          <Divider style={{ marginTop: 20 }} />
          <TableContainer>
            <Table>
              {this.renderTableHead()}
              {this.renderTableData()}
            </Table>
          </TableContainer>
        </Paper>
      </React.Fragment>
    );
  }
}

const useStyles = (theme) => ({
  filterContainer: {
    padding: theme.spacing(2),
  },
  header: {
    boxSizing: "object-fit",
    width: "100%",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginRight: theme.spacing(3),
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
  },
  thumbnail: {
    width: "300px",
    height: "250px",
    objectFit: "cover",
  },
});
export default withStyles(useStyles)(CustomTable);
