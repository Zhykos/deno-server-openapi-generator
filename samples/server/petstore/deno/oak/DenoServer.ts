import { PetService } from "./services/PetService.ts";
import { PetPrivateService } from "./services/PetPrivateService.ts";
import { PetController } from "./controllers/PetController.ts";
import { StoreService } from "./services/StoreService.ts";
import { StorePrivateService } from "./services/StorePrivateService.ts";
import { StoreController } from "./controllers/StoreController.ts";
import { UserService } from "./services/UserService.ts";
import { UserPrivateService } from "./services/UserPrivateService.ts";
import { UserController } from "./controllers/UserController.ts";
import { OpenApiRequest } from "./controllers/OpenApiRequestModel.ts";

export abstract class DenoServer {
  private port: number;
  private privatePetController: PetController;
  private privateStoreController: StoreController;
  private privateUserController: UserController;

  constructor(
    port: number,
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService,
  ) {
    this.port = port;
    const privatePetService = new PetPrivateService(myPetService);
    this.privatePetController = new PetController(privatePetService);
    const privateStoreService = new StorePrivateService(myStoreService);
    this.privateStoreController = new StoreController(privateStoreService);
    const privateUserService = new UserPrivateService(myUserService);
    this.privateUserController = new UserController(privateUserService);
  }

  start(): Promise<void> {
    this.generateRoutes();
    return this.startServer(this.port);
  }

  abstract generateRoutes(): void;

  abstract startServer(port: number): Promise<void>;

  executeController(
    controllerId: string,
    operationId: string,
    openApiRequest: OpenApiRequest,
  ): Promise<Response> {
    if (controllerId == "Pet") {
      return this.executePetController(operationId, openApiRequest);
    }
    if (controllerId == "Store") {
      return this.executeStoreController(operationId, openApiRequest);
    }
    if (controllerId == "User") {
      return this.executeUserController(operationId, openApiRequest);
    }
    throw new Error("Unknown controller: " + controllerId);
  }

  private executePetController(
    operation: string,
    openApiRequest: OpenApiRequest,
  ): Promise<Response> {
    if (operation === "addPet") {
      return this.privatePetController.addPet(openApiRequest);
    }
    if (operation === "deletePet") {
      return this.privatePetController.deletePet(openApiRequest);
    }
    if (operation === "findPetsByStatus") {
      return this.privatePetController.findPetsByStatus(openApiRequest);
    }
    if (operation === "findPetsByTags") {
      return this.privatePetController.findPetsByTags(openApiRequest);
    }
    if (operation === "getPetById") {
      return this.privatePetController.getPetById(openApiRequest);
    }
    if (operation === "updatePet") {
      return this.privatePetController.updatePet(openApiRequest);
    }
    if (operation === "updatePetWithForm") {
      return this.privatePetController.updatePetWithForm(openApiRequest);
    }
    if (operation === "uploadFile") {
      return this.privatePetController.uploadFile(openApiRequest);
    }
    throw new Error("Unknown service: Pet >> " + operation);
  }

  private executeStoreController(
    operation: string,
    openApiRequest: OpenApiRequest,
  ): Promise<Response> {
    if (operation === "deleteOrder") {
      return this.privateStoreController.deleteOrder(openApiRequest);
    }
    if (operation === "getInventory") {
      return this.privateStoreController.getInventory(openApiRequest);
    }
    if (operation === "getOrderById") {
      return this.privateStoreController.getOrderById(openApiRequest);
    }
    if (operation === "placeOrder") {
      return this.privateStoreController.placeOrder(openApiRequest);
    }
    throw new Error("Unknown service: Store >> " + operation);
  }

  private executeUserController(
    operation: string,
    openApiRequest: OpenApiRequest,
  ): Promise<Response> {
    if (operation === "createUser") {
      return this.privateUserController.createUser(openApiRequest);
    }
    if (operation === "createUsersWithArrayInput") {
      return this.privateUserController.createUsersWithArrayInput(
        openApiRequest,
      );
    }
    if (operation === "createUsersWithListInput") {
      return this.privateUserController.createUsersWithListInput(
        openApiRequest,
      );
    }
    if (operation === "deleteUser") {
      return this.privateUserController.deleteUser(openApiRequest);
    }
    if (operation === "getUserByName") {
      return this.privateUserController.getUserByName(openApiRequest);
    }
    if (operation === "loginUser") {
      return this.privateUserController.loginUser(openApiRequest);
    }
    if (operation === "logoutUser") {
      return this.privateUserController.logoutUser(openApiRequest);
    }
    if (operation === "updateUser") {
      return this.privateUserController.updateUser(openApiRequest);
    }
    throw new Error("Unknown service: User >> " + operation);
  }
}
