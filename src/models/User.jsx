import ApiClient from "../services/ApiClient";

class User {
  static Login = (body) => ApiClient.Post("/auth/login", body);
  static Register = (body) => ApiClient.Post("/users/register", body);

  static Logout = () => ApiClient.Post("/logout");

  static Wallet = () => ApiClient.Get("/wallet");
}

export default User;
