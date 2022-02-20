import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";
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
    this.generateRoutes();
    return this;
  }

  private generateRoutes() {
    this.app.use((ctx) => {
      ctx.response.body = "Hello World!";
    });
  }

  async start(): Promise<void> {
    return await this.app.listen({ port: this.port });
  }
}
