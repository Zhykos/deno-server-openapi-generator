import { PetService } from "./PetService.ts";
import { ApiResponse } from "../models/ApiResponse.ts";
import { Pet } from "../models/Pet.ts";

export class PetPrivateService {
  private customPetService: PetService;

  constructor(customPetService: PetService) {
    this.customPetService = customPetService;
  }

  /**
   * Add a new pet to the store
   *
   * pet Pet Pet object that needs to be added to the store
   * returns Pet
   */
  addPet(...args: any): Promise<Pet> {
    const { pet } = args[1 - 1];
    const petCast = Pet(pet);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.addPet(petCast));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Update an existing pet
   *
   * pet Pet Pet object that needs to be added to the store
   * returns Pet
   */
  updatePet(...args: any): Promise<Pet> {
    const { pet } = args[1 - 1];
    const petCast = Pet(pet);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.updatePet(petCast));
      } catch (e) {
        reject(e);
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
  findPetsByStatus(...args: any): Promise<Array<Pet>> {
    const { status } = args[1 - 1];
    const statusCast = Array<"available" | "pending" | "sold">(status);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.findPetsByStatus(statusCast));
      } catch (e) {
        reject(e);
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
  findPetsByTags(...args: any): Promise<Array<Pet>> {
    const { tags } = args[1 - 1];
    const tagsCast = Array<string>(tags);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.findPetsByTags(tagsCast));
      } catch (e) {
        reject(e);
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
  deletePet(...args: any): Promise<void> {
    const { petId } = args[1 - 1];
    const petIdCast = number(petId);
    const { apiKey } = args[2 - 1];
    const apiKeyCast = string(apiKey);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.deletePet(petIdCast, apiKeyCast));
      } catch (e) {
        reject(e);
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
  getPetById(...args: any): Promise<Pet> {
    const { petId } = args[1 - 1];
    const petIdCast = number(petId);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customPetService.getPetById(petIdCast));
      } catch (e) {
        reject(e);
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
  updatePetWithForm(...args: any): Promise<void> {
    const { petId } = args[1 - 1];
    const petIdCast = number(petId);
    const { name } = args[2 - 1];
    const nameCast = string(name);
    const { status } = args[3 - 1];
    const statusCast = string(status);
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.customPetService.updatePetWithForm(
            petIdCast,
            nameCast,
            statusCast,
          ),
        );
      } catch (e) {
        reject(e);
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
  uploadFile(...args: any): Promise<ApiResponse> {
    const { petId } = args[1 - 1];
    const petIdCast = number(petId);
    const { additionalMetadata } = args[2 - 1];
    const additionalMetadataCast = string(additionalMetadata);
    const { file } = args[3 - 1];
    const fileCast = any(file);
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.customPetService.uploadFile(
            petIdCast,
            additionalMetadataCast,
            fileCast,
          ),
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}
