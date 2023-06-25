/*
 * Copyright 2022 Thomas "Zhykos" Cicognani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { StoreService } from "../../services/StoreService.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { Order } from "../../models/Order.ts";
import { Helpers } from "../../controllers/Helpers.ts";

export class MyStoreService implements StoreService {
  getInventory(): Promise<{ [key: string]: number }> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const inventory: { [key: string]: number } = {};
    for (const order of petStoreDB.allOrdersIterator()) {
      if (order.status) {
        const nb: number | undefined = inventory[order.status?.toString()];
        inventory[order.status?.toString()] = nb ? nb + 1 : 1;
      }
    }
    return Promise.resolve(inventory);
  }
  placeOrder(order: Order): Promise<Order> {
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
    return Promise.resolve(order);
  }
  deleteOrder(orderId: string): Promise<void> {
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
    return Promise.resolve();
  }
  getOrderById(orderId: number): Promise<Order> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(orderId)) {
      throw new Deno.errors.InvalidData(
        `Invalid ID to find order: '${orderId}'`,
      );
    }
    const order: Order | undefined = petStoreDB.getOrder(orderId);
    if (order) {
      return Promise.resolve(order);
    }
    throw new Deno.errors.NotFound(`Cannot find order with ID: ${orderId}`);
  }
}
