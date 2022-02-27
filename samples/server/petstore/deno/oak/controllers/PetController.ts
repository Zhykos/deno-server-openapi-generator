/**
 * The PetController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { PetPrivateService } from "../services/PetPrivateService.ts";
import { OpenApiRequest } from "./OpenApiRequestModel.ts";

export class PetController {
  private service: PetPrivateService;

  constructor(service: PetPrivateService) {
    console.log("construct PetController " + service)
    this.service = service;
  }

  addPet(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.addPet);
  }

  deletePet(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.deletePet);
  }

  findPetsByStatus(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.findPetsByStatus);
  }

  findPetsByTags(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.findPetsByTags);
  }

  async getPetById(request: OpenApiRequest): Promise<Response> {
    console.log("controller: getPetById");
    try {
      return  Controller.sendResponse(await this.service.getPetById(1));
    } catch (error) {
      console.log("catch controller: getPetById");
      return  Controller.sendError(error);
    }
    // return Controller.handleRequest(request, this.service.getPetById);
  }

  updatePet(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.updatePet);
  }

  updatePetWithForm(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.updatePetWithForm);
  }

  uploadFile(request: OpenApiRequest): Promise<Response> {
    return Controller.handleRequest(request, this.service.uploadFile);
  }
}
