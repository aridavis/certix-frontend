import React, { useEffect } from 'react'
import Hls from "hls.js"

function Homepage() {
    useEffect(() => {
        if (Hls.isSupported()) {
            var video = document.getElementById('video');
            var videoSrc = 'https://rtmp.certix.suhanginta-hermanudin.xyz/test.m3u8';
            if (Hls.isSupported()) {
              var hls = new Hls();
              hls.loadSource(videoSrc);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
              });
            }
      
          }
    }, []);

    return (
        <div>
            <video id="video"></video>
        </div>
    )
}

export default Homepage
