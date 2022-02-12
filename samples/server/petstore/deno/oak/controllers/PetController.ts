/**
 * The PetController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { PetService } from "../services/PetService.ts";

export class PetController {
  static async addPet(request: any, response: any) {
    await Controller.handleRequest(request, response, PetService.addPet);
  }

  static async deletePet(request: any, response: any) {
    await Controller.handleRequest(request, response, PetService.deletePet);
  }

  static async findPetsByStatus(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      PetService.findPetsByStatus,
    );
  }

  static async findPetsByTags(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      PetService.findPetsByTags,
    );
  }

  static async getPetById(request: any, response: any) {
    await Controller.handleRequest(request, response, PetService.getPetById);
  }

  static async updatePet(request: any, response: any) {
    await Controller.handleRequest(request, response, PetService.updatePet);
  }

  static async updatePetWithForm(request: any, response: any) {
    await Controller.handleRequest(
      request,
      response,
      PetService.updatePetWithForm,
    );
  }

  static async uploadFile(request: any, response: any) {
    await Controller.handleRequest(request, response, PetService.uploadFile);
  }
}
