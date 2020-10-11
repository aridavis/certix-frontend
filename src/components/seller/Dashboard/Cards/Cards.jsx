import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import GradeIcon from "@material-ui/icons/Grade";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";

import DashboardCard from "./DashboardCard";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { orange } from "@material-ui/core/colors";

export class Cards extends Component {
  generateCard = (background, icon, description, value) => (
    <DashboardCard
      iconBackgroundColor={background}
      icon={icon}
      description={description}
      value={value !== undefined ? value : 0}
    ></DashboardCard>
  );

  render() {
    return (
      <Grid container spacing={5} style={{ width: "100%" }}>
        {cardTemplateData.map((res) => (
          <Grid item xs={12} md={6} lg>
            {this.generateCard(
              res.background,
              res.icon,
              res.description,
              this.props.data !== undefined
                ? this.props.data[res.key]
                : undefined
            )}
          </Grid>
        ))}
      </Grid>
    );
  }
}

const cardTemplateData = [
  {
    background: red[400],
    icon: <GradeIcon style={{ fontSize: "50px" }} />,
    description: "Average Ratings",
    key: "average_ratings",
  },
  {
    background: green[400],
    icon: <PlayCircleFilledIcon style={{ fontSize: "50px" }} />,
    description: "Incoming Concert",
    key: "incoming_concert",
  },
  {
    background: blue[400],
    icon: <AccountBalanceWalletIcon style={{ fontSize: "50px" }} />,
    description: "Total Ticket Sold",
    key: "sold_ticket",
  },
  {
    background: teal[400],
    icon: <ConfirmationNumberIcon style={{ fontSize: "50px" }} />,
    description: "Total Income (Rp)",
    key: "total_income",
  },
  {
    background: orange[400],
    icon: <VisibilityIcon style={{ fontSize: "50px" }} />,
    description: "Total Engagement",
    key: "total_engagement",
  },
];

export default Cards;
