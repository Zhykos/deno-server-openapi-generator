import { PetService } from "./services/PetService.ts";
//import { PetPrivateService } from './services/PetPrivateService.ts';
//import { PetController } from './controllers/PetController.ts';
import { StoreService } from "./services/StoreService.ts";
//import { StorePrivateService } from './services/StorePrivateService.ts';
//import { StoreController } from './controllers/StoreController.ts';
import { UserService } from "./services/UserService.ts";
//import { UserPrivateService } from './services/UserPrivateService.ts';
//import { UserController } from './controllers/UserController.ts';
import { DenoServer } from "./DenoServer.ts";
import { Application, Router } from "./deps.ts";
import type { RouterContext } from "./deps.ts";
import { OakOpenApiRequest } from "./controllers/OakOpenApiRequest.ts";

export class DenoOakServer extends DenoServer {
  private app: Application;

  constructor(
    port: number,
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService,
  ) {
    super(port, myPetService, myStoreService, myUserService);
    this.app = new Application();
  }

  generateRoutes(): void {
    const router = new Router();
    router
      .get("/", (context) => {
        context.response.body = "Hello world!";
      });

    let localVarPath: string;

    localVarPath = `/pet`;
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "addPet",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .delete(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "deletePet",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/findByStatus`;
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "findPetsByStatus",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/findByTags`;
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "findPetsByTags",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "getPetById",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet`;
    router
      .put(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "updatePet",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "updatePetWithForm",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/pet/{petId}/uploadImage`.replace(`{${"petId"}}`, ":petId");
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executePetController(
            "uploadFile",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId",
    );
    router
      .delete(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeStoreController(
            "deleteOrder",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/store/inventory`;
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeStoreController(
            "getInventory",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId",
    );
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeStoreController(
            "getOrderById",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/store/order`;
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeStoreController(
            "placeOrder",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user`;
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "createUser",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/createWithArray`;
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "createUsersWithArrayInput",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/createWithList`;
    router
      .post(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "createUsersWithListInput",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .delete(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "deleteUser",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "getUserByName",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/login`;
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "loginUser",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/logout`;
    router
      .get(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "logoutUser",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router
      .put(
        localVarPath,
        async (context: RouterContext<string, any, Record<string, any>>) => {
          const openApiRequest = new OakOpenApiRequest(context);
          const response: Response = await this.executeUserController(
            "updateUser",
            openApiRequest,
          );
          context.response.status = response.status;
          context.response.body = await response.json();
          context.response.headers = response.headers;
        },
      );

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async startServer(port: number): Promise<void> {
    return await this.app.listen({ port });
  }
}
