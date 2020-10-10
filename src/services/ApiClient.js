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
          window.location = '/login'
        }
      }
    } catch (ex) {
      alert('error')
    }

    return Promise.reject(error);
  }
);

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