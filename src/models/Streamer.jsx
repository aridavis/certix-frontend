import ApiClient from "../services/ApiClient";

class Streamer {
  static Get = (keyword = "") =>
    ApiClient.Get("/sellers", { keyword: keyword });
}

export default Streamer;
