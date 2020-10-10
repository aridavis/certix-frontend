import Swal from "sweetalert2";

const { default: Axios } = require("axios");

const API_URL = process.env.REACT_APP_API_URL;
const cookie = require("react-cookies");
Axios.interceptors.request.use(function (config) {
  const token = "Bearer " + cookie.load("ACCESS_TOKEN");
  config.headers.Authorization = token;

  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    try {
      if (error.response !== undefined) {
        if (error.response.status === 401) {
            Swal.fire("Not Authorized", "", "warning").then((res) => {
                window.location = '/login'
            });
        } else {
            var message = "";
            var idx = 0;
            for (const [, value] of Object.entries(error.response.data.message)) {
                value.forEach((res) => {
                if (idx !== 0) message += "<br>";
                message += res;
                idx++;
                });
            }
            message = message.replaceAll(" id ", " ");
            Swal.fire("Error", message, "error");
        }
      }
    } catch (ex) {
        if (error.response.status !== undefined) {
            Swal.fire(
                `Error ${error.response.status}`,
                error.response.statusText,
                "error"
              );
        } else {
            Swal.fire("Error", ex.toString(), "error");
        }

        return Promise.reject(error);
    }
    }
)

class ApiClient {
  static Get = (url, params) => {
    return Axios.get(API_URL + url, {
      params: params,
    });
  };

  static Post = (url, body) => {
    return Axios.post(API_URL + url, body);
  };

  static Put = (url, body) => {
    return Axios.put(API_URL + url, body);
  };

  static Delete = (url) => {
    return Axios.delete(API_URL + url);
  };
}

export default ApiClient;