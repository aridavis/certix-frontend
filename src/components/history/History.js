import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import singer from '../../assets/images/singer.jpg'
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
  Button
} from "@material-ui/core";

const useStyles = makeStyles({
  jumbotron: {
    background: `url(${singer})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    color: 'white',
  },
  title: {
    fontFamily: 'Equinox',
    marginBottom: '10px'
  },
  subtitle: {
    fontFamily: 'Gilmer'
  },
  tableContainer: {
    marginTop: '40px',
    maxWidth: '80vw'
  },
  historyContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

function createData(name, start_time, genre, price, token) {
  return { name, start_time, genre, price, token };
}

const rows = [
    createData('asd', '10.00', 'pop', 200000, 'aaa'),
    createData('asd', '10.00', 'pop', 200000, 'bbb'),
    createData('asd', '10.00', 'pop', 200000, 'ccc'),
    createData('asd', '10.00', 'pop', 200000, 'ddd'),
    createData('asd', '10.00', 'pop', 200000, 'eee'),
    createData('asd', '10.00', 'pop', 200000, 'fff'),
    createData('asd', '10.00', 'pop', 200000, 'ggg'),
];

function onClick(token) {
  const el = document.createElement('textarea');
  el.value = token;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  Swal.fire({
    title: 'Token copied to clipboard',
    html: `Your token is: <strong>${token}</strong><br>DO NOT show this token to anyone else!`,
    timer: 2000,
  })
}

export default function History() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box className={classes.jumbotron}>
        <Box className={classes.header} px={10}>
          <Typography className={classes.title} variant="h2">
            Your Concert History
          </Typography>
          <Typography className={classes.subtitle} variant="h4">
            15 Concert(s) Watched
          </Typography>
        </Box>
      </Box>
      <Box className={classes.historyContainer}>
        <TableContainer component={Paper} className={classes.tableContainer}>
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
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.start_time}</TableCell>
                  <TableCell align="center">{row.genre}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center"><Button variant="contained" onClick={() => onClick(row.token)}>Get Private Token</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}