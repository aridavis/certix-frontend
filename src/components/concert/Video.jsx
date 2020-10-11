import React, { useEffect, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import Axios from "axios";
import Alternative from "./Alternative";
import { TextField, Button } from "@material-ui/core";
import Token from "../../models/Token";
import cookie from "react-cookies";
import Swal from "sweetalert2";

function Video({ source, start_time, id }) {
  const url =
    "https://rtmp.certix.suhanginta-hermanudin.xyz/" + source + ".m3u8";

  const [available, setAvailable] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    Axios.get(url).catch((err) => {
      setAvailable(false);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log(cookie.load("WATCH_TOKEN"), token);
      if (!cookie.load("WATCH_TOKEN") || token == "") {
        return;
      }

      Axios.post(
        process.env.REACT_APP_API_URL + "/concerts/validation/session",
        {
          cookie: cookie.load("WATCH_TOKEN"),
          token,
        }
      ).then((res) => {
        if (!res.data) {
          Swal.fire("Warning", "Someone has used your token", "error");
        }
      });
    }, 2000);
  }, []);

  function validateToken() {
    Token.Validate({
      token,
    }).then((res) => {
      cookie.save("WATCH_TOKEN", res.data, { path: "/concert/" + id });
    });
  }

  return (
    <>
      {
        // Date.now() > new Date(start_time) &&
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0",
          }}
        >
          <TextField
            id="filled-basic"
            label="Enter concert token"
            variant="outlined"
            fontWeight="fontWeightBold"
            onChange={(e) => setToken(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={validateToken}
          >
            Use Token
          </Button>
        </div>
      }
      <div style={{ width: "100%", height: "800px" }}>
        {available && (
          <ReactHlsPlayer
            style={{ width: "100%", height: "100%" }}
            url={url}
            autoplay={true}
            controls={true}
            width={500}
            height={375}
          />
        )}
        {!available && <Alternative message={"Concert has not been started"} />}
      </div>
    </>
  );
}

export default Video;
