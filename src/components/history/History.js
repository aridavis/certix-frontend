import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import singer from "../../assets/images/singer.jpg";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
  TableCell,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Button,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import Concert from "../../models/Concert";
import Header from "../header/Header";

const useStyles = makeStyles({
  jumbotron: {
    background: `url(${singer})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "400px",
    display: "flex",
    alignItems: "center",
  },
  header: {
    color: "white",
  },
  title: {
    fontFamily: "Equinox",
    marginBottom: "10px",
  },
  subtitle: {
    fontFamily: "Gilmer",
  },
  tableContainer: {
    maxWidth: "80vw",
  },
  historyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  category: {
    fontFamily: "Equinox",
    color: "#ffffff",
    margin: "40px 0 40px 0",
  },
});

function onClick(token) {
  token = token.toString().replaceAll(",", "\n");
  const el = document.createElement("textarea");
  el.value = token;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  Swal.fire({
    title: "Token copied to clipboard",
    html: `Your token is:<br/><strong>${token}</strong><br>DO <strong>NOT</strong> show this token( to strangers!`,
    timer: 2000,
  });
}

function generateStar(rating) {
  if (rating === 0) {
    return "Not yet rated!";
  }
  const stars = [];
  let temp = rating;
  let count = 5;
  while (temp >= 1) {
    stars.push(<StarIcon />);
    temp -= 1;
    count -= 1;
  }
  if (temp > 0 && temp < 1) {
    stars.push(<StarHalfIcon />);
    count -= 1;
  }
  while (count > 0) {
    stars.push(<StarBorderIcon />);
    count--;
  }

  return stars;
}

export default function History() {
  const classes = useStyles();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    Concert.History().then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <Box className={classes.jumbotron}>
        <Box className={classes.header} px={10}>
          <Typography className={classes.title} variant="h2">
            Your Concert History
          </Typography>
          <Typography className={classes.subtitle} variant="h4">
            See Your Ticket Purchases
          </Typography>
        </Box>
      </Box>
      <Box className={classes.historyContainer}>
        {history && history.upcoming.length > 0 && (
          <>
            <Typography className={classes.category} variant="h5">
              Upcoming Concert Tickets
            </Typography>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table className={classes.table} aria-label="simple table">
                <colgroup>
                  <col width="30%" />
                  <col width="30%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="20%" />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Concert Name</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">Genre</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.upcoming.map((row) =>
                    row.ticket.map((t) =>
                      t.ticket_details.map((td) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.start_time}</TableCell>
                          <TableCell align="center">{row.genre}</TableCell>
                          <TableCell align="center">{row.price}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => onClick(td.token)}
                            >
                              Get Private Token
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {history && history.past.length > 0 && (
          <>
            <Typography className={classes.category} variant="h5">
              Past Concert Tickets
            </Typography>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table className={classes.table} aria-label="simple table">
                <colgroup>
                  <col width="30%" />
                  <col width="30%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="20%" />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Concert Name</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">Genre</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history &&
                    history.past.length > 0 &&
                    history.past.map((row) =>
                      row.ticket.map((t) =>
                        t.ticket_details.map((td) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.start_time}
                            </TableCell>
                            <TableCell align="center">{row.genre}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">
                              {generateStar(td.star)}
                            </TableCell>
                          </TableRow>
                        ))
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </div>
  );
}
