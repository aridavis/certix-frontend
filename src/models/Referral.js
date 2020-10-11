import ApiClient from "../services/ApiClient";

class Referral {
  static All = () => ApiClient.Get("/referral/all");
}

export default Referral;