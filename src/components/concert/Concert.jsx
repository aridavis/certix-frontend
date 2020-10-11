import React, { useEffect, useState } from 'react'
import Header from "../header/Header";
import { makeStyles } from '@material-ui/core/styles';
import Video from './Video'
import { Typography, Box, TextField, Button } from "@material-ui/core";
import Con from '../../models/Concert'
import EventIcon from '@material-ui/icons/Event';
import AlbumIcon from '@material-ui/icons/Album';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Referral from "../../models/Referral";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    detailContainer: {
        color: 'white',
    },
    concertDetail: {
        fontFamily: 'Gilmer',
        margin: '10px 0 10px 0',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        margin: '0 5px 0 5px'
    },
    innerContainer: {
        display: 'flex',
    },
    referralContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    }
});

function Concert({ match }) {
    const classes = useStyles()
    const [concert, setConcert] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const history = useHistory()

    useEffect(() => {
        Con.Get(match.params.id)
        .then(res => {
            if (!res.data) {
                history.push('/')
            }
            setConcert(res.data)
        })
    }, [])

    function changeQuantity(diff) {
        const newQty = quantity + diff
        if (newQty > 0) {
            setQuantity(newQty)
        }
    }

    function shareReferral() {
        Referral.Generate({
            concert_id: concert.id
        })
        .then(res => {
            const el = document.createElement('textarea');
            el.value = res.data.referral_id;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            Swal.fire({
                title: 'Referral code copied to clipboard',
                html: `Your code is:<br/><strong>${res.data.referral_id}</strong><br>Share this code to everyone else to get free ticket!`,
                timer: 4000,
            })
        })
    }

    return (
        <div >
            <Header />
            <Video />
            { concert && 
                <Box className={classes.detailContainer} mx={20} my={5}>
                    <div className={classes.nameContainer}>
                        <Typography variant="h3" className={classes.concertDetail}>{concert.name}</Typography>
                        <Button variant="contained" color="primary" style={{ marginLeft: 20, color: 'white' }} onClick={shareReferral}>Share Referral Code</Button>
                    </div>
                    <Box className={classes.innerContainer}>
                        <div style={{flex: 1}}>
                            <Typography variant="h5" className={classes.concertDetail}><EventIcon className={classes.icon} /> {concert.start_time}</Typography>
                            <Typography variant="h5" className={classes.concertDetail}><AlbumIcon className={classes.icon} /> {concert.genre.name}</Typography>
                        </div>
                        <div style={{flex: 1}}>
                            <Typography variant="h5" className={classes.concertDetail}>Individual: Rp. {concert.price}</Typography>
                            <Typography variant="h5" className={classes.concertDetail}>Quantity: <RemoveCircleIcon className={classes.icon} onClick={() => changeQuantity(-1)} /> { quantity } <AddCircleIcon className={classes.icon} onClick={() => changeQuantity(1)} /> </Typography>
                        </div>
                        <div style={{flex: 1}}>
                            <Typography variant="h5" className={classes.concertDetail}>Total: Rp. { quantity * concert.price }</Typography>
                            <div className={classes.referralContainer}>
                                <TextField id="filled-basic" label="Enter referral code (if any)" variant="outlined" style={{marginRight: '5px'}}/>
                                <Button variant="contained">Check</Button>
                            </div>
                        </div>
                    </Box>
                </Box>
            }
        </div>
    )
}

export default Concert
