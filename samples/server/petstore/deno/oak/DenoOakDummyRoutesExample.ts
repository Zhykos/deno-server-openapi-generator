import { DenoOakServer } from "./DenoOakServer.ts";
import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";
import { ApiResponse } from "./models/ApiResponse.ts";
import { Category } from "./models/Category.ts";
import { Order } from "./models/Order.ts";
import { Pet } from "./models/Pet.ts";
import { Tag } from "./models/Tag.ts";
import { User } from "./models/User.ts";

// deno run --allow-net --watch DenoOakDummyRoutesExample.ts

// Custom services

class MyPetService implements PetService {
  addPet(_pet: Pet): Pet {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> addPet",
    );
  }
  updatePet(_pet: Pet): Pet {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> updatePet",
    );
  }
  findPetsByStatus(
    _status: Array<"available" | "pending" | "sold">,
  ): Array<Pet> {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> findPetsByStatus",
    );
  }
  findPetsByTags(_tags: Array<string>): Array<Pet> {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> findPetsByTags",
    );
  }
  deletePet(_petId: number, _apiKey?: string): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> deletePet",
    );
  }
  getPetById(_petId: number): Pet {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> getPetById",
    );
  }
  updatePetWithForm(_petId: number, _name?: string, _status?: string): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> updatePetWithForm",
    );
  }
  uploadFile(
    _petId: number,
    _additionalMetadata?: string,
    _file?: any,
  ): ApiResponse {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: PetService >> uploadFile",
    );
  }
}
class MyStoreService implements StoreService {
  getInventory(): { [key: string]: number } {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: StoreService >> getInventory",
    );
  }
  placeOrder(_order: Order): Order {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: StoreService >> placeOrder",
    );
  }
  deleteOrder(_orderId: string): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: StoreService >> deleteOrder",
    );
  }
  getOrderById(_orderId: number): Order {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: StoreService >> getOrderById",
    );
  }
}
class MyUserService implements UserService {
  createUser(_user: User): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> createUser",
    );
  }
  createUsersWithArrayInput(_user: Array<User>): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> createUsersWithArrayInput",
    );
  }
  createUsersWithListInput(_user: Array<User>): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> createUsersWithListInput",
    );
  }
  loginUser(_username: string, _password: string): string {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> loginUser",
    );
  }
  logoutUser(): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> logoutUser",
    );
  }
  deleteUser(_username: string): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> deleteUser",
    );
  }
  getUserByName(_username: string): User {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> getUserByName",
    );
  }
  updateUser(_username: string, _user: User): void {
    throw new Deno.errors.NotSupported(
      "Method not implemented yet: UserService >> updateUser",
    );
  }
}

// Service instances

const myPetService: PetService = new MyPetService();
const myStoreService: StoreService = new MyStoreService();
const myUserService: UserService = new MyUserService();

// Create then start Deno server

new DenoOakServer(3000, myPetService, myStoreService, myUserService).start();
