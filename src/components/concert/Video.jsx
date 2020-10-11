import React, { useEffect, useState } from 'react'
import ReactHlsPlayer from "react-hls-player";
import Axios from "axios";
import Alternative from './Alternative'

function Video({ source }) {
    const url = "https://rtmp.certix.suhanginta-hermanudin.xyz/" + source + ".m3u8"

    const [available, setAvailable] = useState(true)

    useEffect(() => {
        Axios.get(url)
        .catch(err => {
            setAvailable(false)
        })
    }, [])

    return (
        <div style={{ width: "100%", height: "800px" }}>
            { available &&
                <ReactHlsPlayer
                    style={{ width: '100%', height: '100%' }}
                    url={url}
                    autoplay={true}
                    controls={true}
                    width={500}
                    height={375}
                />
            }
            {
                !available &&
                    <Alternative/>
            }
            
        </div>
    )
}

export default Video