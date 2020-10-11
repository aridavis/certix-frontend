import ApiClient from "../services/ApiClient";

class Concert {
  static History = () => ApiClient.Get("/concerts/history");
}

export default Concert;