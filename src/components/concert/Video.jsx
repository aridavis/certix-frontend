import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alternative from './Alternative'

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

function Video() {
    const classes = useStyles()

    return (
        <>
            <Alternative className={classes.streamVideo}/>
            {/* <video className={classes.streamVideo}></video> */}
        </>
    )
}

export default Video
