import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import concert from '../../assets/images/concert3.jpg'
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
import { Link } from 'react-router-dom'
import Color from '../../theme/colors'

const useStyles = makeStyles({
  jumbotron: {
    background: `url(${concert})`,
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
    maxWidth: '80vw'
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50
  },
  category: {
    fontFamily: 'Equinox',
    color: '#ffffff',
    margin: '40px 0 40px 0'
  },
  obtained: {
    textAlign: 'center'
  },
  history: {
    textDecoration: 'none'
  },
  historyButton: {
    backgroundColor: Color.lightGreen
  }
});

function createData(name, start_time, genre, price, count, referral_id) {
  return { name, start_time, genre, price, count, referral_id };
}
const referrals = [
  createData('asd', '10.00', 'pop', 200000, 3, 'aaa'),
  createData('asd', '10.00', 'pop', 200000, 4, 'bbb'),
  createData('asd', '10.00', 'pop', 200000, 5, 'ccc'),
];

function getReferral(referral_id) {
    const el = document.createElement('textarea');
    el.value = referral_id;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  
    Swal.fire({
      title: 'Token copied to clipboard',
      html: `Your token is: <strong>${referral_id}</strong><br>DO NOT show this token to strangers!`,
      timer: 2000,
    })
}

export default function Referral() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box className={classes.jumbotron}>
        <Box className={classes.header} px={10}>
          <Typography className={classes.title} variant="h2">
            Your Referrals
          </Typography>
          <Typography className={classes.subtitle} variant="h4">
            7 Free Ticket(s) Has Been Obtained
          </Typography>
        </Box>
      </Box>
      <Box className={classes.historyContainer}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
          <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="10%" />
              <col width="15%" />
              <col width="10%" />
              <col width="25%" />
          </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Concert Name</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">Genre</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referrals.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.start_time}</TableCell>
                  <TableCell align="center">{row.genre}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{`${row.count} / 5`}</TableCell>
                  { row.count < 5 && <TableCell align="center"><Button variant="contained" onClick={() => getReferral(row.referral_id)}>Get Referral</Button></TableCell> }
                  { row.count == 5 && <TableCell align="center"><Typography className={classes.obtained}><Link to="/history" className={classes.history}><Button variant="contained" className={classes.historyButton}>Ticket History</Button></Link></Typography></TableCell> }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}