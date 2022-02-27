import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";
import { UserPrivateService } from "./services/UserPrivateService.ts";
import { UserController } from "./controllers/UserController.ts";
import { StorePrivateService } from "./services/StorePrivateService.ts";
import { StoreController } from "./controllers/StoreController.ts";
import { PetPrivateService } from "./services/PetPrivateService.ts";
import { PetController } from "./controllers/PetController.ts";
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
    myUserService: UserService
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

  petController(
    operation: string,
    openApiRequest: OpenApiRequest
  ): Promise<Response> {
    if (operation === "getPetById")
      return this.privatePetController.getPetById(openApiRequest);

    return new Promise<Response>((_resolve, _reject) => {});
  }
}
