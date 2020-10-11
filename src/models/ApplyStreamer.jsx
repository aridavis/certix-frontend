import ApiClient from "../services/ApiClient";

class ApplyStreamerModel {
  static Store = (body) => ApiClient.Post("/seller/application", body);
}

export default ApplyStreamerModel;
