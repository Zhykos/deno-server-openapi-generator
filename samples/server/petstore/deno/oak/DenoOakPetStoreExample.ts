import { create } from "./DenoServer.ts";
import { DenoOakServer } from "./DenoOakServer.ts";
import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";
import { ApiResponse } from "./models/ApiResponse.ts";
import { Order } from "./models/Order.ts";
import { Pet } from "./models/Pet.ts";
import { User } from "./models/User.ts";

// Custom services

class MyPetService implements PetService {
  addPet(pet: Pet): Promise<Pet> {
    throw new Error("Method not implemented yet.");
  }
  deletePet(petId: number, apiKey?: string): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Promise<Array<Pet>> {
    throw new Error("Method not implemented yet.");
  }
  findPetsByTags(tags: Array<string>): Promise<Array<Pet>> {
    throw new Error("Method not implemented yet.");
  }
  getPetById(petId: number): Promise<Pet> {
    throw new Error("Method not implemented yet.");
  }
  updatePet(pet: Pet): Promise<Pet> {
    throw new Error("Method not implemented yet.");
  }
  updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
  ): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  uploadFile(
    petId: number,
    additionalMetadata?: string,
    file?: any,
  ): Promise<ApiResponse> {
    throw new Error("Method not implemented yet.");
  }
}
class MyStoreService implements StoreService {
  deleteOrder(orderId: string): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  getInventory(): Promise<{ [key: string]: number }> {
    throw new Error("Method not implemented yet.");
  }
  getOrderById(orderId: number): Promise<Order> {
    throw new Error("Method not implemented yet.");
  }
  placeOrder(order: Order): Promise<Order> {
    throw new Error("Method not implemented yet.");
  }
}
class MyUserService implements UserService {
  createUser(user: User): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  createUsersWithArrayInput(user: Array<User>): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  createUsersWithListInput(user: Array<User>): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  deleteUser(username: string): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  getUserByName(username: string): Promise<User> {
    throw new Error("Method not implemented yet.");
  }
  loginUser(username: string, password: string): Promise<string> {
    throw new Error("Method not implemented yet.");
  }
  logoutUser(): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
  updateUser(username: string, user: User): Promise<void> {
    throw new Error("Method not implemented yet.");
  }
}

// Service instances

const myPetService: PetService = new MyPetService();
const myStoreService: StoreService = new MyStoreService();
const myUserService: UserService = new MyUserService();

// Create then start Deno server

create(new DenoOakServer(), 3000, myPetService, myStoreService, myUserService);

// deno run --allow-net DenoOakPetStoreExample.ts
