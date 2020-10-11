import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import singer from '../../assets/images/singer.jpg'
import { Typography, Box } from "@material-ui/core";

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
  }
});

function createData(name, start_time, end_time, price, url_video) {
  return { name, time: `${start_time} - ${end_time}`, price, url_video };
}

const rows = [
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
    createData('asd', '10.00', '14.00', 200000, 'https://suhanginta-hermanudin/streams/m3u8'),
];

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
    </div>
  );
}