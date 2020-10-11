import ApiClient from "../services/ApiClient";

class Impression {
  static Plus = (body) => ApiClient.Get("/plus-impression", body);
}

export default Impression;