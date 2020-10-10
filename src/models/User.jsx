import ApiClient from "../services/ApiClient";

class User {
  static Login = (body) => ApiClient.Post("/auth/login", body);
  static Register = (body) => ApiClient.Post("/users/register", body);
}

export default User;
