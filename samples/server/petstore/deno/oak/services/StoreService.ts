/*
 * OpenAPI service to implement for Store.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Order } from "../models/Order.ts";

export interface StoreService {
  /**
   * Returns pet inventories by status
   * Returns a map of status codes to quantities
   *
   * @returns { [key: string]: number; }
   */
  getInventory(): Promise<{ [key: string]: number }>;
  /**
   * Place an order for a pet
   *
   * @param order Order order placed for purchasing the pet
   * @returns Order
   */
  placeOrder(order: Order): Promise<Order>;
  /**
   * Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   *
   * @param orderId string ID of the order that needs to be deleted
   * @returns void: no response value expected for this operation
   */
  deleteOrder(orderId: string): Promise<void>;
  /**
   * Find purchase order by ID
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions
   *
   * @param orderId number ID of pet that needs to be fetched
   * @returns Order
   */
  getOrderById(orderId: number): Promise<Order>;
}
