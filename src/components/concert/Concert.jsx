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
import Axios from 'axios'
import cookie from 'react-cookies'
import Colors from '../../theme/colors'
import User from '../../models/User';
import Ticket from '../../models/Ticket';

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
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [acceptedCode, setAcceptedCode] = useState(null)
    const history = useHistory()

    useEffect(() => {
        Con.Show(match.params.id)
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

    function checkReferral() {
        const token = "Bearer " + cookie.load("ACCESS_TOKEN");
        Axios.get(process.env.REACT_APP_API_URL + '/referral/use', {
            params: {
                concert_id: concert.id,
                referral_id: code
            },
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setError('')
            setSuccess(`Referral code ${res.data.id} has been applied`)
            setAcceptedCode(res.data.id)
        })
        .catch(err => {
            setError(err.response.data.message.error)
            setSuccess('')
            setAcceptedCode(null)
        })
    }

    function getFinalPrice() {
        let p = concert.price * quantity
        let discount = 0

        if (acceptedCode) {
            discount = p * 0.2
            if (discount > 50000) {
                discount = 50000
            }
        }

        return p - discount
    }

    function buyTicket() {
        Ticket.Buy({
            concert_id: concert.id,
            referral_id: acceptedCode,
            quantity
        })
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Ticket succesfully bought',
                timer: 3000
            })
            .then(() => {
              window.location.reload()  
            })
        })
    }

    return (
        <div >
            <Header />
            { concert && 
                <>
                    <Video source={concert.stream_key} />
                    <Box className={classes.detailContainer} mx={20} my={5}>
                        <div className={classes.nameContainer}>
                            <Typography variant="h3" className={classes.concertDetail}>{concert.name}</Typography>
                            <Button variant="contained" color="primary" style={{ marginLeft: 20, color: 'white' }} onClick={shareReferral}>Share Referral Code</Button>
                        </div>
                        <Box className={classes.innerContainer}>
                            <div style={{flex: 2}}>
                                <Typography variant="h5" className={classes.concertDetail}><EventIcon className={classes.icon} /> {concert.start_time}</Typography>
                                <Typography variant="h5" className={classes.concertDetail}><AlbumIcon className={classes.icon} /> {concert.genre.name}</Typography>
                            </div>
                            <div style={{flex: 2}}>
                                <Typography variant="h5" className={classes.concertDetail}>Individual: Rp. {concert.price}</Typography>
                                <Typography variant="h5" className={classes.concertDetail}>Quantity: <RemoveCircleIcon className={classes.icon} onClick={() => changeQuantity(-1)} /> { quantity } <AddCircleIcon className={classes.icon} onClick={() => changeQuantity(1)} /> </Typography>
                            </div>
                            <div style={{flex: 2}}>
                                <Typography variant="h5" className={classes.concertDetail}>Total: Rp. { getFinalPrice() }</Typography>
                                <div className={classes.referralContainer}>
                                    <TextField id="filled-basic" label="Enter referral code (if any)" variant="outlined" style={{marginRight: '5px'}} onChange={(e) => setCode(e.target.value)}/>
                                    <Button variant="contained" onClick={checkReferral} style={{marginLeft: 20}}>Apply</Button>
                                </div>
                                <Typography style={{color: 'red'}} fontWeight="fontWeightBold" className={classes.concertDetail}>{ error }</Typography>
                                <Typography style={{color: Colors.lightGreen}} fontWeight="fontWeightBold" className={classes.concertDetail}>{ success }</Typography>
                            </div>
                            <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Button variant="contained" color="primary" style={{ color: 'white', padding: '15px 30px' }} size="large" onClick={buyTicket}>Buy Ticket</Button>
                            </div>
                        </Box>
                    </Box>
                </>
            }
        </div>
    )
}

export default Concert
