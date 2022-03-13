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
    this.service = service;
  }

  async addPet(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.addPet(await Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async updatePet(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.updatePet(await Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async findPetsByStatus(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.findPetsByStatus(
          await Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async findPetsByTags(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.findPetsByTags(
          await Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async deletePet(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.deletePet(await Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async getPetById(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.getPetById(await Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async updatePetWithForm(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.updatePetWithForm(
          await Controller.collectRequestParams(request),
        ),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }

  async uploadFile(request: OpenApiRequest): Promise<Response> {
    try {
      return Controller.sendResponse(
        await this.service.uploadFile(await Controller.collectRequestParams(request)),
      );
    } catch (error) {
      return Controller.sendError(error);
    }
  }
}
