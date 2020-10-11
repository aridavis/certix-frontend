import React, { useEffect, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import Axios from "axios";
import Alternative from "./Alternative";
import { TextField, Button } from "@material-ui/core";
import Token from "../../models/Token";
import cookie from "react-cookies";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

function Video({ source, start_time, id }) {
  const url =
    "https://rtmp.certix.suhanginta-hermanudin.xyz/" + source + ".m3u8";

  const [available, setAvailable] = useState(true);
  const [token, setToken] = useState("");
  const [canWatch, setCanWatch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Axios.get(url).catch((err) => {
      setAvailable(false);
    });
  }, [url]);

  useEffect(() => {
    Axios.post(process.env.REACT_APP_API_URL + "/concerts/validation/session", {
      cookie: cookie.load("WATCH_COOKIE"),
      token: cookie.load("WATCH_TOKEN"),
    }).then((res) => {
      if (res.data === 1) {
        setCanWatch(true);

        setInterval(() => {
          Axios.post(
            process.env.REACT_APP_API_URL + "/concerts/validation/session",
            {
              cookie: cookie.load("WATCH_COOKIE"),
              token: cookie.load("WATCH_TOKEN"),
            }
          ).then((res) => {
            if (!res.data) {
              setCanWatch(false);
              cookie.remove("WATCH_COOKIE");
              cookie.remove("WATCH_TOKEN");
              Swal.fire({
                title: "Warning",
                html: `Someone has used your token`,
                icon: "error",
                timer: 1000,
              }).then(() => {
                history.push("/");
              });
            }
          });
        }, 2000);
      }
    });
  }, []);

  function validateToken() {
    Token.Validate({
      token,
    }).then((res) => {
      setCanWatch(true);
      cookie.save("WATCH_COOKIE", res.data, { path: "/concert/" + id });
      cookie.save("WATCH_TOKEN", token, { path: "/concert/" + id });

      setInterval(() => {
        Axios.post(
          process.env.REACT_APP_API_URL + "/concerts/validation/session",
          {
            cookie: res.data,
            token: token,
          }
        ).then((res) => {
          if (!res.data) {
            setCanWatch(false);
            cookie.remove("WATCH_COOKIE");
            cookie.remove("WATCH_TOKEN");
            Swal.fire({
              title: "Warning",
              html: `Someone has used your token`,
              icon: "error",
              timer: 1000,
            }).then(() => {
              window.location = "/";
            });
          }
        });
      }, 2000);
    });
  }

  return (
    <>
      {
        // Date.now() > new Date(start_time) &&
        !canWatch && (
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
        )
      }
      <div style={{ width: "100%", height: "800px" }}>
        {available && canWatch && (
          <ReactHlsPlayer
            style={{ width: "100%", height: "100%" }}
            url={url}
            autoplay={true}
            controls={true}
            width={500}
            height={375}
          />
        )}
        {available && !canWatch && (
          <Alternative
            message={
              "The concert has started! Please insert your token at the top of this page"
            }
          />
        )}
        {!available && <Alternative message={"Concert has not been started"} />}
      </div>
    </>
  );
}

export default Video;
