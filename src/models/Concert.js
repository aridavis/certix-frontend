import ApiClient from "../services/ApiClient";

class Concert {
  static Get = (keyword = "") =>
    ApiClient.Get("/concerts", { keyword: keyword });
  static History = () => ApiClient.Get("/concerts/history");
}

export default Concert;
