import React from 'react'
import { Typography } from "@material-ui/core";
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

function Alternative() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
        }}>
            <Typography variant="h3">
               Concert has not been started <SentimentSatisfiedIcon style={{ fontSize: '2rem' }} />
            </Typography>
        </div>
    )
}

export default Alternative
