import ApiClient from "../services/ApiClient";

class Ticket {
  static Buy = (body) =>
    ApiClient.Post("/tickets", body);
}

export default Ticket;
