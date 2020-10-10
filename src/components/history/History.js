import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
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

  return (
    <main>
        <div className="top">
            
        </div>
        <div className="bottom">
            {}
        </div>
    </main>
  );
}