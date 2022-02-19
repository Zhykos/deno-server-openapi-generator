/**
 * The StoreController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { StorePrivateService } from "../services/StorePrivateService.ts";

export class StoreController {
  private service: StorePrivateService;

  constructor(service: StorePrivateService) {
    this.service = service;
  }

  deleteOrder(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.deleteOrder);
  }

  getInventory(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.getInventory);
  }

  getOrderById(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.getOrderById);
  }

  placeOrder(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.placeOrder);
  }
}
