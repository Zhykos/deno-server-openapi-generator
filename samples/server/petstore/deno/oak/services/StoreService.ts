/* eslint-disable no-unused-vars */
import { Service } from "./Service.ts";
import { Order } from "../models/Order.ts";

export class StoreService {
  /**
   * Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   *
   * orderId string ID of the order that needs to be deleted
   * no response value expected for this operation
   */
  static deleteOrder(orderId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          orderId,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Returns pet inventories by status
   * Returns a map of status codes to quantities
   *
   * returns { [key: string]: number; }
   */
  static getInventory(): Promise<{ [key: string]: number }> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Find purchase order by ID
   * For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
   *
   * orderId number ID of pet that needs to be fetched
   * returns Order
   */
  static getOrderById(orderId: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          orderId,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Place an order for a pet
   *
   * order Order order placed for purchasing the pet
   * returns Order
   */
  static placeOrder(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          order,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
}
