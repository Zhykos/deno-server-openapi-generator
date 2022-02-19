/**
 * The PetController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import { Controller } from "./Controller.ts";
import { PetPrivateService } from "../services/PetPrivateService.ts";

export class PetController {
  private service: PetPrivateService;

  constructor(service: PetPrivateService) {
    this.service = service;
  }

  addPet(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.addPet);
  }

  deletePet(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.deletePet);
  }

  findPetsByStatus(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.findPetsByStatus);
  }

  findPetsByTags(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.findPetsByTags);
  }

  getPetById(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.getPetById);
  }

  updatePet(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.updatePet);
  }

  updatePetWithForm(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.updatePetWithForm);
  }

  uploadFile(request: any): Promise<Response> {
    return Controller.handleRequest(request, this.service.uploadFile);
  }
}
