import ApiClient from "../services/ApiClient";

class Referral {
  static All = () => ApiClient.Get("/referral/all");
  static Generate = (body) => ApiClient.Post('/referral/generate', body)
  static Use = (body) => ApiClient.Get('/referral/use', body)
}

export default Referral;