import React from 'react'
import { Typography } from "@material-ui/core";
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

function Alternative({ className }) {
    return (
        <div className={className} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h3">
               Concert has not been started <SentimentSatisfiedIcon style={{ fontSize: '2rem' }} />
            </Typography>
        </div>
    )
}

export default Alternative
