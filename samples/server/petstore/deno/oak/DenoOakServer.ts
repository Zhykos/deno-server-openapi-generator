import { PetService } from "./services/PetService.ts";
import { PetPrivateService } from "./services/PetPrivateService.ts";
import { PetController } from "./controllers/PetController.ts";
import { StoreService } from "./services/StoreService.ts";
import { StorePrivateService } from "./services/StorePrivateService.ts";
import { StoreController } from "./controllers/StoreController.ts";
import { UserService } from "./services/UserService.ts";
import { UserPrivateService } from "./services/UserPrivateService.ts";
import { UserController } from "./controllers/UserController.ts";
import { DenoServer } from "./DenoServer.ts";
import { Application } from "./deps.ts";

export class DenoOakServer implements DenoServer {
  private app: Application;
  private port = 3000;

  constructor() {
    this.app = new Application();
  }

  create(
    port: number,
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService,
  ): DenoOakServer {
    this.port = port;
    this.generateRoutes(myPetService, myStoreService, myUserService);
    return this;
  }

  private generateRoutes(
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService,
  ) {
    const privatePetService = new PetPrivateService(myPetService);
    const privatePetController = new PetController(privatePetService);
    const privateStoreService = new StorePrivateService(myStoreService);
    const privateStoreController = new StoreController(privateStoreService);
    const privateUserService = new UserPrivateService(myUserService);
    const privateUserController = new UserController(privateUserService);

    this.app.use((ctx) => {
      ctx.response.body = "Hello World!";
    });
  }

  async start(): Promise<void> {
    return await this.app.listen({ port: this.port });
  }
}
