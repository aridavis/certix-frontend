import React, { useEffect } from 'react'
import Hls from "hls.js"

function Homepage() {
    useEffect(() => {
        if (Hls.isSupported()) {
          var video = document.getElementById('video');
          var hls = new Hls();
          // bind them together
          hls.attachMedia(video);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log("video and hls.js are now bound together !");
            hls.loadSource("http://certix.suhanginta-hermanudin.xyz/concert/test.m3u8");
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              console.log("manifest loaded, found " + data.levels.length + " quality level");
            });
          });
        }
    }, []);

    return (
        <div>
            <video id="video"></video>
        </div>
    )
}

export default Homepage
