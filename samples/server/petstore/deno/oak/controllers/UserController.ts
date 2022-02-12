/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { UserService } from "../services/UserService.ts";

export class UserController {
  static async createUser(request: any, response: any) {
    await Controller.handleRequest(request, response, UserService.createUser);
  }

  static async createUsersWithArrayInput(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      UserService.createUsersWithArrayInput,
    );
  }

  static async createUsersWithListInput(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      UserService.createUsersWithListInput,
    );
  }

  static async deleteUser(request: any, response: any) {
    await Controller.handleRequest(request, response, UserService.deleteUser);
  }

  static async getUserByName(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      UserService.getUserByName,
    );
  }

  static async loginUser(request: any, response: any) {
    await Controller.handleRequest(request, response, UserService.loginUser);
  }

  static async logoutUser(request: any, response: any) {
    await Controller.handleRequest(request, response, UserService.logoutUser);
  }

  static async updateUser(request: any, response: any) {
    await Controller.handleRequest(request, response, UserService.updateUser);
  }
}
