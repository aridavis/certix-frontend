import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alternative from './Alternative'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Axios from 'axios';
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
    streamVideo: {
        width: '100%',
        height: '80vh',
        backgroundColor: 'white'
    },
    detailContainer: {
        color: 'white',
    },
    concertName: {
        fontFamily: 'Equinox',
    }
});

window.videojs = videojs;
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

function Video({ source, start_time }) {
    const classes = useStyles()
    const [available, setAvailable] = useState(false)

    useEffect(() => {
        Axios.get('https://rtmp.certix.suhanginta-hermanudin.xyz/' + 'cicakk' + '.m3u8')
        .then(res => {
            setAvailable(true)
        })
        .catch(err => {

        })
    }, [])

    function startVideo(video) {
        videojs(video)
    }

    return (
        <div style={{position: 'relative'}}>
            { Date.now() > new Date(start_time) &&
                <TextField id="filled-basic" label="Enter referral code (if any)" variant="outlined" style={{marginRight: '5px'}}/>
            }
            { available && 
                <video ref={startVideo} className={classes.streamVideo + 'video-js vjs-default-skin'} controls>
                    <source src={'https://rtmp.certix.suhanginta-hermanudin.xyz/' + 'cicakk' + '.m3u8'} type="application/x-mpegURL" />
                </video>
            }
            { !available && <Alternative className={classes.streamVideo}/> }
        </div>
    )
}

export default Video
