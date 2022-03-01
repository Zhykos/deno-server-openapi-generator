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
  addPet(pet: Pet): Pet {
    throw new Error("Method not implemented yet: PetService >> addPet");
  }
  deletePet(petId: number, apiKey?: string): void {
    throw new Error("Method not implemented yet: PetService >> deletePet");
  }
  findPetsByStatus(
    status: Array<"available" | "pending" | "sold">,
  ): Array<Pet> {
    throw new Error(
      "Method not implemented yet: PetService >> findPetsByStatus",
    );
  }
  findPetsByTags(tags: Array<string>): Array<Pet> {
    throw new Error("Method not implemented yet: PetService >> findPetsByTags");
  }
  getPetById(petId: number): Pet {
    console.log("example: getPetById");
    throw new Error("Method not implemented yet: PetService >> getPetById");
  }
  updatePet(pet: Pet): Pet {
    throw new Error("Method not implemented yet: PetService >> updatePet");
  }
  updatePetWithForm(petId: number, name?: string, status?: string): void {
    throw new Error(
      "Method not implemented yet: PetService >> updatePetWithForm",
    );
  }
  uploadFile(
    petId: number,
    additionalMetadata?: string,
    file?: any,
  ): ApiResponse {
    throw new Error("Method not implemented yet: PetService >> uploadFile");
  }
}
class MyStoreService implements StoreService {
  deleteOrder(orderId: string): void {
    throw new Error("Method not implemented yet: StoreService >> deleteOrder");
  }
  getInventory(): { [key: string]: number } {
    throw new Error("Method not implemented yet: StoreService >> getInventory");
  }
  getOrderById(orderId: number): Order {
    throw new Error("Method not implemented yet: StoreService >> getOrderById");
  }
  placeOrder(order: Order): Order {
    throw new Error("Method not implemented yet: StoreService >> placeOrder");
  }
}
class MyUserService implements UserService {
  createUser(user: User): void {
    throw new Error("Method not implemented yet: UserService >> createUser");
  }
  createUsersWithArrayInput(user: Array<User>): void {
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithArrayInput",
    );
  }
  createUsersWithListInput(user: Array<User>): void {
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithListInput",
    );
  }
  deleteUser(username: string): void {
    throw new Error("Method not implemented yet: UserService >> deleteUser");
  }
  getUserByName(username: string): User {
    throw new Error("Method not implemented yet: UserService >> getUserByName");
  }
  loginUser(username: string, password: string): string {
    throw new Error("Method not implemented yet: UserService >> loginUser");
  }
  logoutUser(): void {
    throw new Error("Method not implemented yet: UserService >> logoutUser");
  }
  updateUser(username: string, user: User): void {
    throw new Error("Method not implemented yet: UserService >> updateUser");
  }
}

// Service instances

const myPetService: PetService = new MyPetService();
const myStoreService: StoreService = new MyStoreService();
const myUserService: UserService = new MyUserService();

// Create then start Deno server

new DenoOakServer(
  3000,
  myPetService,
  myStoreService,
  myUserService,
).start();

// deno run --allow-net --watch DenoOakPetStoreExample.ts
