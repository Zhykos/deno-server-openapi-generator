/**
 * The StoreController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { StorePrivateService } from "../services/StorePrivateService.ts";
import { OpenApiRequest } from "./OpenApiRequestModel.ts";

export class StoreController {
  private service: StorePrivateService;

  constructor(service: StorePrivateService) {
    this.service = service;
  }

  async deleteOrder(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(await this.service.deleteOrder(1));
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async getInventory(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(await this.service.getInventory(1));
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async getOrderById(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(await this.service.getOrderById(1));
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async placeOrder(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(await this.service.placeOrder(1));
    } catch (error) {
      return Controller.sendError(error);
    }
  }
}
