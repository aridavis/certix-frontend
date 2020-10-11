import ApiClient from "../services/ApiClient";

class Genre {
  static Get = (filter) => ApiClient.Get("/genres", filter);
}

export default Genre;
