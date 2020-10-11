import ApiClient from "../services/ApiClient";

class Token {
  static Validate = (body) => ApiClient.Post("/concerts/validation/token", body);
}

export default Token;