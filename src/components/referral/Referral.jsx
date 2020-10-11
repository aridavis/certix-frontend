import React, { useEffect, useState } from 'react';
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
import Header from '../header/Header';
import Ref from '../../models/Referral'

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
      title: 'Referral code copied to clipboard',
      html: `Your referral code is: <strong>${referral_id}</strong><br>Share this to other people to get <strong>FREE</strong> ticket!`,
      timer: 2000,
    })
}

export default function Referral() {
  const classes = useStyles()
  const [referrals, setReferrals] = useState(null)
  
  useEffect(() => {
    Ref.All()
    .then(res => {
        setReferrals(res.data)
    })
  }, [])

  return (
    <div className={classes.root}>
        <Header />
      <Box className={classes.jumbotron}>
        <Box className={classes.header} px={10}>
          <Typography className={classes.title} variant="h2">
            Your Referrals
          </Typography>
          <Typography className={classes.subtitle} variant="h4">
            Get Free Ticket Using Referrals
          </Typography>
        </Box>
      </Box>
      { referrals && referrals.length > 0 &&
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
                        {row.concert.name}
                    </TableCell>
                    <TableCell align="center">{row.concert.start_time}</TableCell>
                    <TableCell align="center">{row.concert.genre.name}</TableCell>
                    <TableCell align="center">{row.concert.price}</TableCell>
                    <TableCell align="center">{`${row.count} / 5`}</TableCell>
                    { row.count < 5 && <TableCell align="center"><Button variant="contained" onClick={() => getReferral(row.id)}>Get Referral</Button></TableCell> }
                    { row.count == 5 && <TableCell align="center"><Typography className={classes.obtained}><Link to="/history" className={classes.history}><Button variant="contained" className={classes.historyButton}>Ticket History</Button></Link></Typography></TableCell> }
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        }
    </div>
  );
}