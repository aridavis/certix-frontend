import ApiClient from "../services/ApiClient";

class Concert {
  static Get = (keyword = "") =>
    ApiClient.Get("/concerts", { keyword: keyword });
  static History = () => ApiClient.Get("/concerts/history");
  static Get = (id) => ApiClient.Get(`/concerts/${id}`)
}

export default Concert;
