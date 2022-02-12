/**
 * The StoreController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { StoreService } from "../services/StoreService.ts";

export class StoreController {
  static async deleteOrder(request: any, response: any) {
    await Controller.handleRequest(request, response, StoreService.deleteOrder);
  }

  static async getInventory(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      StoreService.getInventory,
    );
  }

  static async getOrderById(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      StoreService.getOrderById,
    );
  }

  static async placeOrder(request: any, response: any) {
    await Controller.handleRequest(request, response, StoreService.placeOrder);
  }
}
