import { StoreService } from "../../services/StoreService.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { Order } from "../../models/Order.ts";

export class MyStoreService implements StoreService {
  getInventory(): { [key: string]: number } {
    throw new Error("Method not implemented yet: StoreService >> getInventory");
  }
  placeOrder(order: Order): Order {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const orderId: number | undefined = order.id;
    if (orderId === undefined || isNaN(orderId)) {
      throw new Deno.errors.NotSupported(
        `Invalid ID to place order: '${orderId}'`,
      );
    }
    const orderInDB: Order | undefined = petStoreDB.getOrder(orderId);
    if (orderInDB) {
      throw new Deno.errors.NotSupported(
        `An order already exists with ID: ${orderId}`,
      );
    }
    petStoreDB.addOrder(order);
    return order;
  }
  deleteOrder(orderId: string): void {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const orderNb = Number(orderId);
    if (isNaN(orderNb)) {
      throw new Deno.errors.InvalidData(
        `Invalid ID to delete order: '${orderNb}'`,
      );
    }
    const order: Order | undefined = petStoreDB.getOrder(orderNb);
    if (!order) {
      throw new Deno.errors.NotFound(
        `Cannot delete order with ID: ${orderNb}`,
      );
    }
  }
  getOrderById(orderId: number): Order {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(orderId)) {
      throw new Deno.errors.InvalidData(
        `Invalid ID to find order: '${orderId}'`,
      );
    }
    const order: Order | undefined = petStoreDB.getOrder(orderId);
    if (order) {
      return order;
    }
    throw new Deno.errors.NotFound(`Cannot find order with ID: ${orderId}`);
  }
}
