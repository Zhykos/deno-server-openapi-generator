/*
* OpenAPI controller for Store.
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
import { Controller } from "./Controller.ts";
import { StorePrivateService } from "../services/StorePrivateService.ts";
import { OpenApiRequest } from "./OpenApiRequestModel.ts";

export class StoreController {
  private service: StorePrivateService;

  constructor(service: StorePrivateService) {
    this.service = service;
  }

  async getInventory(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.getInventory(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async placeOrder(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.placeOrder(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async deleteOrder(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.deleteOrder(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async getOrderById(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.getOrderById(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }
}
