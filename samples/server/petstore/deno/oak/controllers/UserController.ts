/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { UserPrivateService } from "../services/UserPrivateService.ts";
import { OpenApiRequest } from "./OpenApiRequestModel.ts";

export class UserController {
  private service: UserPrivateService;

  constructor(service: UserPrivateService) {
    this.service = service;
  }

  async createUser(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.createUser(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async createUsersWithArrayInput(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.createUsersWithArrayInput(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async createUsersWithListInput(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.createUsersWithListInput(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async deleteUser(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.deleteUser(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async getUserByName(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.getUserByName(
          Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async loginUser(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.loginUser(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async logoutUser(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.logoutUser(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async updateUser(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.updateUser(Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }
}
