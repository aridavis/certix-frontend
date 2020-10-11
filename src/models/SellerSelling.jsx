import ApiClient from "../services/ApiClient";

class SellerSelling {
  static Get = (filter) => ApiClient.Get("/sellers/sellings", filter);
  static Post = (body) => ApiClient.Post("/concerts", body);
  static ValidateSeller = () => ApiClient.Post("/sellers/validate");
}

export default SellerSelling;
