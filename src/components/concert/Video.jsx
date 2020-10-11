import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alternative from './Alternative'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

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

function Video({ source }) {
    const classes = useStyles()

    function startVideo(video) {
        videojs(video)
    }

    return (
        <>
            {/* <Alternative className={classes.streamVideo}/> */}
            <video ref={startVideo} className={classes.streamVideo + 'video-js vjs-default-skin'} controls>
                <source src={'https://rtmp.certix.suhanginta-hermanudin.xyz/' + source + '.m3u8'} type="application/x-mpegURL" />
            </video>
        </>
    )
}

export default Video
