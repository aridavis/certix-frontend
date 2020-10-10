import ApiClient from "../services/ApiClient";

class ApplySellerModel {
  static Store = (body) => ApiClient.Post("/seller/application", body);
}

export default ApplySellerModel;
