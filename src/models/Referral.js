import ApiClient from "../services/ApiClient";

class Referral {
  static All = () => ApiClient.Get("/referral/all");
  static Generate = (body) => ApiClient.Post('/referral/generate', body)
}

export default Referral;