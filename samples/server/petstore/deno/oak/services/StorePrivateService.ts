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
        reject(e);
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
    const { order } = args[1 - 1];
    const orderCast = new Order(order);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.placeOrder(orderCast));
      } catch (e) {
        reject(e);
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
    const { orderId } = args[1 - 1];
    const orderIdCast = String(orderId);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.deleteOrder(orderIdCast));
      } catch (e) {
        reject(e);
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
    const { orderId } = args[1 - 1];
    const orderIdCast = Number(orderId);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customStoreService.getOrderById(orderIdCast));
      } catch (e) {
        reject(e);
      }
    });
  }
}
