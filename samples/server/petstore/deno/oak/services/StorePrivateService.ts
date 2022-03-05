import { StoreService } from "./StoreService.ts";
import { Order } from "../models/Order.ts";

export class StorePrivateService {
  private customStoreService: StoreService;

  constructor(customStoreService: StoreService) {
    this.customStoreService = customStoreService;
  }

  /**
   * Returns pet inventories by status
   * Returns a map of status codes to quantities
   *
   * returns { [key: string]: number; }
   */
  getInventory(..._args: any): Promise<{ [key: string]: number }> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.getInventory());
      } catch (e) {
        reject(JSON.stringify({
          error: e.message || "Error in service Store >> getInventory",
          code: e.status || 500,
        }));
      }
    });
  }
  /**
   * Place an order for a pet
   *
   * order Order order placed for purchasing the pet
   * returns Order
   */
  placeOrder(...args: any): Promise<Order> {
    const order: Order = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.placeOrder(order));
      } catch (e) {
        reject(JSON.stringify({
          error: e.message || "Error in service Store >> placeOrder",
          code: e.status || 500,
        }));
      }
    });
  }
  /**
   * Delete purchase order by ID
   * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
   *
   * orderId string ID of the order that needs to be deleted
   * no response value expected for this operation
   */
  deleteOrder(...args: any): Promise<void> {
    const orderId: string = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.deleteOrder(orderId));
      } catch (e) {
        reject(JSON.stringify({
          error: e.message || "Error in service Store >> deleteOrder",
          code: e.status || 500,
        }));
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
  getOrderById(...args: any): Promise<Order> {
    const orderId: number = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.getOrderById(orderId));
      } catch (e) {
        reject(JSON.stringify({
          error: e.message || "Error in service Store >> getOrderById",
          code: e.status || 500,
        }));
      }
    });
  }
}
