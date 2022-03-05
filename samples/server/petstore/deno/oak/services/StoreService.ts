import { Order } from "../models/Order.ts";

export interface StoreService {
  /**
   * Returns pet inventories by status
   * Returns a map of status codes to quantities
   *
   * returns { [key: string]: number; }
   */
  getInventory(): { [key: string]: number };
  /**
   * Place an order for a pet
   *
   * order Order order placed for purchasing the pet
   * returns Order
   */
  placeOrder(order: Order): Order;
  /**
   * Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   *
   * orderId string ID of the order that needs to be deleted
   * no response value expected for this operation
   */
  deleteOrder(orderId: string): void;
  /**
   * Find purchase order by ID
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
   *
   * orderId number ID of pet that needs to be fetched
   * returns Order
   */
  getOrderById(orderId: number): Order;
}
