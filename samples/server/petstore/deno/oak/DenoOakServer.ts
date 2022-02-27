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
import { Application, Router } from "./deps.ts";

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

    const router = new Router();
    router
      .get("/", (context) => {
        context.response.body = "Hello world!";
      });

    let localVarPath;

    localVarPath = `/pet`;
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .delete(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/findByStatus`;
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/findByTags`;
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet`;
    router
      .put(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/pet/{petId}/uploadImage`.replace(`{${"petId"}}`, ":petId");
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId",
    );
    router
      .delete(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/store/inventory`;
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId",
    );
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/store/order`;
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user`;
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/createWithArray`;
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/createWithList`;
    router
      .post(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .delete(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/login`;
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/logout`;
    router
      .get(localVarPath, (context) => {
        context.response.status = 500;
      });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .put(localVarPath, (context) => {
        context.response.status = 500;
      });

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async start(): Promise<void> {
    return await this.app.listen({ port: this.port });
  }
}
