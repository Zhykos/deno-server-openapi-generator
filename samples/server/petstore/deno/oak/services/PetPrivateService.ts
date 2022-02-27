import { PetService } from "./PetService.ts";
import { ApiResponse } from "../models/ApiResponse.ts";
import { Pet } from "../models/Pet.ts";

export class PetPrivateService {
  private customPetService: PetService;

  constructor(customPetServicee: PetService) {
    console.log("construct PetPrivateService" + customPetServicee)
    this.customPetService = customPetServicee;
  }

  /**
   * Add a new pet to the store
   *
   * pet Pet Pet object that needs to be added to the store
   * returns Pet
   */
  addPet(pet: Pet): Promise<Pet> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.addPet(pet));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Deletes a pet
   *
   * petId number Pet id to delete
   * apiKey string  (optional)
   * no response value expected for this operation
   */
  deletePet(petId: number, apiKey?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.deletePet(petId, apiKey));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   *
   * status Array<'available' | 'pending' | 'sold'> Status values that need to be considered for filter
   * returns Array<Pet>
   */
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Promise<Array<Pet>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.findPetsByStatus(status));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * tags Array<string> Tags to filter by
   * returns Array<Pet>
   */
  findPetsByTags(tags: Array<string>): Promise<Array<Pet>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.findPetsByTags(tags));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Find pet by ID
   * Returns a single pet
   *
   * petId number ID of pet to return
   * returns Pet
   */
  getPetById(petId: number): Promise<Pet> {
    console.log("service: getPetById");
    return new Promise((resolve, reject) => {
      try {
        console.log("try service: getPetById");
        resolve(this.customPetService.getPetById(petId));
      } catch (e) {
        console.log("catch service: getPetById" + e);
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Update an existing pet
   *
   * pet Pet Pet object that needs to be added to the store
   * returns Pet
   */
  updatePet(pet: Pet): Promise<Pet> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.updatePet(pet));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Updates a pet in the store with form data
   *
   * petId number ID of pet that needs to be updated
   * name string Updated name of the pet (optional)
   * status string Updated status of the pet (optional)
   * no response value expected for this operation
   */
  updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.updatePetWithForm(petId, name, status));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * uploads an image
   *
   * petId number ID of pet to update
   * additionalMetadata string Additional data to pass to server (optional)
   * file any file to upload (optional)
   * returns ApiResponse
   */
  uploadFile(
    petId: number,
    additionalMetadata?: string,
    file?: any,
  ): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.customPetService.uploadFile(petId, additionalMetadata, file),
        );
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
}
