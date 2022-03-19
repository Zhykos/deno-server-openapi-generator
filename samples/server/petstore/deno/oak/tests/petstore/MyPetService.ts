import { PetService } from "../../services/PetService.ts";
import { Pet, StatusEnum } from "../../models/Pet.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { ApiResponse } from "../../models/ApiResponse.ts";
import { iterFilter } from "./deps.ts";

export class MyPetService implements PetService {
  addPet(pet: Pet): Pet {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const petId: number | undefined = pet.id;
    if (petId === undefined || isNaN(petId)) {
      throw new Deno.errors.NotSupported(`Invalid ID to add pet: '${petId}'`);
    }
    const petInDB: Pet | undefined = petStoreDB.getPet(petId);
    if (petInDB) {
      throw new Deno.errors.NotSupported(
        `A pet already exists with ID: ${petId}`,
      );
    }
    petStoreDB.addPet(pet);
    return pet;
  }
  updatePet(pet: Pet): Pet {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const petId: number | undefined = pet.id;
    if (petId === undefined || isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to update pet: '${petId}'`);
    }
    const petInDB: Pet | undefined = petStoreDB.getPet(petId);
    if (petInDB) {
      petInDB.copyFrom(pet);
      return petInDB;
    }
    throw new Deno.errors.NotFound(`Cannot update pet with ID: ${petId}`);
  }
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Array<Pet> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const checkStatus = status.filter((statusStr) => {
      const statusObj = statusStr as StatusEnum;
      return statusObj == StatusEnum.Available ||
        statusObj == StatusEnum.Sold || statusObj == StatusEnum.Pending;
    });
    if (checkStatus.length != status.length) {
      throw new Deno.errors.InvalidData(
        `Invalid status to find pet: '${status}'`,
      );
    }

    const wishedStatus: Array<StatusEnum> = status.map((statusStr) =>
      statusStr as StatusEnum
    );

    return Array.from(
      iterFilter<Pet>(
        petStoreDB.allPetsIterator(),
        (pet) => pet.status !== undefined && wishedStatus.includes(pet.status),
      ),
    );
  }
  findPetsByTags(tags: Array<string>): Array<Pet> {
    // TODO ERROR 400: Invalid tag value (no idea how...)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    return Array.from(
      iterFilter<Pet>(
        petStoreDB.allPetsIterator(),
        (pet) => {
          if (pet.tags) {
            const petTags: Array<string | undefined> = pet.tags.map((tag) =>
              tag.name
            );
            const filteredArray = petTags.filter((tag) =>
              tag !== undefined && tags.includes(tag)
            );
            return filteredArray.length > 0;
          } else {
            return false;
          }
        },
      ),
    );
  }
  deletePet(petId: number, apiKey?: string): void {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (apiKey !== undefined && apiKey !== "secret-token") {
      throw new Deno.errors.PermissionDenied(`Wrong API key: '${apiKey}'`);
    }

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to delete pet: '${petId}'`);
    }
    const pet: Pet | undefined = petStoreDB.getPet(petId);
    if (!pet) {
      throw new Deno.errors.NotFound(
        `Cannot delete pet with ID: ${petId}`,
      );
    }
  }
  getPetById(petId: number): Pet {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to find pet: '${petId}'`);
    }
    const pet: Pet | undefined = petStoreDB.getPet(petId);
    if (pet) {
      return pet;
    }
    throw new Deno.errors.NotFound(`Cannot find pet with ID: ${petId}`);
  }
  updatePetWithForm(petId: number, name?: string, status?: string): void {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to update pet: '${petId}'`);
    }
    const existingPet: Pet | undefined = petStoreDB.getPet(petId);
    if (!existingPet) {
      throw new Deno.errors.NotFound(`Cannot update pet with ID: ${petId}`);
    }

    if (name) {
      if (name === "foo") {
        throw new Deno.errors.InvalidData(
          `Invalid name to update pet: '${name}'`,
        );
      }
      existingPet.name = name;
    }
    if (status) {
      switch (status) {
        case StatusEnum.Available.toString():
          existingPet.status = StatusEnum.Available;
          break;
        case StatusEnum.Pending.toString():
          existingPet.status = StatusEnum.Pending;
          break;
        case StatusEnum.Sold.toString():
          existingPet.status = StatusEnum.Sold;
          break;
        default:
          throw new Deno.errors.InvalidData(
            `Invalid status to update pet: '${status}'`,
          );
      }
    }
  }
  uploadFile(
    _petId: number,
    _additionalMetadata?: string,
    _file?: any,
  ): ApiResponse {
    throw new Error("Method not implemented yet: PetService >> uploadFile");
  }
}
