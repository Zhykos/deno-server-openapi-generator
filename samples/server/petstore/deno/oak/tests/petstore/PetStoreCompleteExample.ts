import { DenoOakServer } from "../../DenoOakServer.ts";
import { PetService } from "../../services/PetService.ts";
import { StoreService } from "../../services/StoreService.ts";
import { UserService } from "../../services/UserService.ts";
import { ApiResponse } from "../../models/ApiResponse.ts";
import { Order } from "../../models/Order.ts";
import { Pet, StatusEnum } from "../../models/Pet.ts";
import { User } from "../../models/User.ts";
import { PetStoreDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { iterFilter, iterMap } from "./deps.ts";

// deno run --allow-net --allow-read --allow-write --watch PetStoreCompleteExample.ts

// Custom services

class MyPetService implements PetService {
  addPet(pet: Pet): Pet {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreDatabase();

    const petId: number | undefined = pet.id;
    if (petId === undefined || isNaN(petId)) {
      throw new Deno.errors.NotSupported("Invalid input");
    }
    const petInDB: Pet | undefined = petStoreDB.getPet("pet-" + petId);
    if (petInDB) {
      throw new Deno.errors.NotSupported(
        `A Pet already exists with Id: ${petId}`,
      );
    }
    petStoreDB.addPet(pet);
    return pet;
  }
  updatePet(pet: Pet): Pet {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    const petStoreDB = new PetStoreDatabase();

    const petId: number | undefined = pet.id;
    if (petId === undefined || isNaN(petId)) {
      throw new Deno.errors.InvalidData(`Invalid Id to find pet: '${petId}'`);
    }
    const petInDB: Pet | undefined = petStoreDB.getPet("pet-" + petId);
    if (petInDB) {
      petInDB.copyFrom(pet);
      return petInDB;
    }
    throw new Deno.errors.NotFound("Cannot find pet with ID: " + petId);
  }
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Array<Pet> {
    const petStoreDB = new PetStoreDatabase();

    const wishedStatus: Array<StatusEnum> = Array.from(
      iterMap(status, (statusStr) => statusStr as StatusEnum),
    );
    return Array.from(
      iterFilter<Pet>(
        petStoreDB.allPetsIterator(),
        (pet) => pet.status !== undefined && wishedStatus.includes(pet.status),
      ),
    );
  }
  findPetsByTags(_tags: Array<string>): Array<Pet> {
    throw new Error("Method not implemented yet: PetService >> findPetsByTags");
  }
  deletePet(_petId: number, _apiKey?: string): void {
    throw new Error("Method not implemented yet: PetService >> deletePet");
  }
  getPetById(petId: number): Pet {
    const petStoreDB = new PetStoreDatabase();

    if (isNaN(petId)) {
      throw new Deno.errors.InvalidData("Invalid Id to find pet");
    }
    const pet: Pet | undefined = petStoreDB.getPet("pet-" + petId);
    if (pet) {
      return pet;
    }
    throw new Deno.errors.NotFound("Cannot find pet with ID: " + petId);
  }
  updatePetWithForm(_petId: number, _name?: string, _status?: string): void {
    throw new Error(
      "Method not implemented yet: PetService >> updatePetWithForm",
    );
  }
  uploadFile(
    _petId: number,
    _additionalMetadata?: string,
    _file?: any,
  ): ApiResponse {
    throw new Error("Method not implemented yet: PetService >> uploadFile");
  }
}
class MyStoreService implements StoreService {
  getInventory(): { [key: string]: number } {
    throw new Error("Method not implemented yet: StoreService >> getInventory");
  }
  placeOrder(_order: Order): Order {
    throw new Error("Method not implemented yet: StoreService >> placeOrder");
  }
  deleteOrder(_orderId: string): void {
    throw new Error("Method not implemented yet: StoreService >> deleteOrder");
  }
  getOrderById(_orderId: number): Order {
    throw new Error("Method not implemented yet: StoreService >> getOrderById");
  }
}
class MyUserService implements UserService {
  createUser(_user: User): void {
    throw new Error("Method not implemented yet: UserService >> createUser");
  }
  createUsersWithArrayInput(_user: Array<User>): void {
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithArrayInput",
    );
  }
  createUsersWithListInput(_user: Array<User>): void {
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithListInput",
    );
  }
  loginUser(_username: string, _password: string): string {
    throw new Error("Method not implemented yet: UserService >> loginUser");
  }
  logoutUser(): void {
    throw new Error("Method not implemented yet: UserService >> logoutUser");
  }
  deleteUser(_username: string): void {
    throw new Error("Method not implemented yet: UserService >> deleteUser");
  }
  getUserByName(_username: string): User {
    throw new Error("Method not implemented yet: UserService >> getUserByName");
  }
  updateUser(_username: string, _user: User): void {
    throw new Error("Method not implemented yet: UserService >> updateUser");
  }
}

// Service instances

const myPetService: PetService = new MyPetService();
const myStoreService: StoreService = new MyStoreService();
const myUserService: UserService = new MyUserService();

// Create then start Deno server

new DenoOakServer(3000, myPetService, myStoreService, myUserService).start();
