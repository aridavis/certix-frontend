import ApiClient from "../services/ApiClient";

class Concert {
  static History = () => ApiClient.Get("/concerts/history");
  static Get = (id) => ApiClient.Get(`/concerts/${id}`)
}

export default Concert;