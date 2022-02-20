/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from './Controller.ts';
import { UserPrivateService } from '../services/UserPrivateService.ts';
import { OpenApiRequest } from "./OpenApiRequestModel.ts";

export class UserController {

  private service: UserPrivateService;

  constructor(service: UserPrivateService) {
    this.service = service;
  }

  createUser(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.createUser);
  }

  createUsersWithArrayInput(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.createUsersWithArrayInput);
  }

  createUsersWithListInput(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.createUsersWithListInput);
  }

  deleteUser(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.deleteUser);
  }

  getUserByName(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.getUserByName);
  }

  loginUser(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.loginUser);
  }

  logoutUser(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.logoutUser);
  }

  updateUser(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.updateUser);
  }

}