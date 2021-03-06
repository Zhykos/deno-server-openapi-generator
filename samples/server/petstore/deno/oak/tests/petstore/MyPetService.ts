/*
 * Copyright 2022 Thomas "Zhykos" Cicognani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PetService } from "../../services/PetService.ts";
import { Pet, StatusEnum } from "../../models/Pet.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { ApiResponse } from "../../models/ApiResponse.ts";
import { iterFilter } from "./deps.ts";
import { Helpers } from "../../controllers/Helpers.ts";

export class MyPetService implements PetService {
  addPet(pet: Pet): Promise<Pet> {
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
    return Helpers.wrapPromise(pet);
  }
  updatePet(pet: Pet): Promise<Pet> {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const petId: number | undefined = pet.id;
    if (petId === undefined || isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to update pet: '${petId}'`);
    }
    const petInDB: Pet | undefined = petStoreDB.getPet(petId);
    if (petInDB) {
      petInDB.copyFrom(pet);
      return Helpers.wrapPromise(petInDB);
    }
    throw new Deno.errors.NotFound(`Cannot update pet with ID: ${petId}`);
  }
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Promise<Array<Pet>> {
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

    return Helpers.wrapPromise(Array.from(
      iterFilter<Pet>(
        petStoreDB.allPetsIterator(),
        (pet) => pet.status !== undefined && wishedStatus.includes(pet.status),
      ),
    ));
  }
  findPetsByTags(tags: Array<string>): Promise<Array<Pet>> {
    // TODO ERROR 400: Invalid tag value (no idea how...)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    return Helpers.wrapPromise(Array.from(
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
    ));
  }
  deletePet(petId: number, apiKey?: string): Promise<void> {
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
    return Helpers.wrapPromise();
  }
  getPetById(petId: number): Promise<Pet> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid ID to find pet: '${petId}'`);
    }
    const pet: Pet | undefined = petStoreDB.getPet(petId);
    if (pet) {
      return Helpers.wrapPromise(pet);
    }
    throw new Deno.errors.NotFound(`Cannot find pet with ID: ${petId}`);
  }
  updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
  ): Promise<void> {
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
    return Helpers.wrapPromise();
  }
  uploadFile(
    petId: number,
    additionalMetadata?: string,
    file?: any,
  ): Promise<ApiResponse> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData(
        `Invalid ID to upload file for pet: '${petId}'`,
      );
    }
    const existingPet: Pet | undefined = petStoreDB.getPet(petId);
    if (!existingPet) {
      throw new Deno.errors.NotFound(
        `Cannot upload file for pet with ID: ${petId}`,
      );
    }

    const response = new ApiResponse();
    response.code = 0;
    if (additionalMetadata) {
      response.type = additionalMetadata;
    }

    if (file) {
      response.message = file.filename + ";" + file.originalName + ";" +
        file.contentType;
    }

    return Helpers.wrapPromise(response);
  }
}
