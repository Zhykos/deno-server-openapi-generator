import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";
import { DenoServer } from "./DenoServer.ts";
import { Application, Router } from "./deps-oak.ts";
import type { RouterContext } from "./deps-oak.ts";
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

    this.createRoute(router, "/pet", "post", "Pet", "addPet");

    this.createRoute(router, "/pet", "put", "Pet", "updatePet");

    this.createRoute(
      router,
      "/pet/findByStatus",
      "get",
      "Pet",
      "findPetsByStatus",
    );

    this.createRoute(router, "/pet/findByTags", "get", "Pet", "findPetsByTags");

    this.createRoute(
      router,
      "/pet/{petId}".replace(`{${"petId"}}`, ":petId"),
      "delete",
      "Pet",
      "deletePet",
    );

    this.createRoute(
      router,
      "/pet/{petId}".replace(`{${"petId"}}`, ":petId"),
      "get",
      "Pet",
      "getPetById",
    );

    this.createRoute(
      router,
      "/pet/{petId}".replace(`{${"petId"}}`, ":petId"),
      "post",
      "Pet",
      "updatePetWithForm",
    );

    this.createRoute(
      router,
      "/pet/{petId}/uploadImage".replace(`{${"petId"}}`, ":petId"),
      "post",
      "Pet",
      "uploadFile",
    );

    this.createRoute(
      router,
      "/store/inventory",
      "get",
      "Store",
      "getInventory",
    );

    this.createRoute(router, "/store/order", "post", "Store", "placeOrder");

    this.createRoute(
      router,
      "/store/order/{orderId}".replace(`{${"orderId"}}`, ":orderId"),
      "delete",
      "Store",
      "deleteOrder",
    );

    this.createRoute(
      router,
      "/store/order/{orderId}".replace(`{${"orderId"}}`, ":orderId"),
      "get",
      "Store",
      "getOrderById",
    );

    this.createRoute(router, "/user", "post", "User", "createUser");

    this.createRoute(
      router,
      "/user/createWithArray",
      "post",
      "User",
      "createUsersWithArrayInput",
    );

    this.createRoute(
      router,
      "/user/createWithList",
      "post",
      "User",
      "createUsersWithListInput",
    );

    this.createRoute(router, "/user/login", "get", "User", "loginUser");

    this.createRoute(router, "/user/logout", "get", "User", "logoutUser");

    this.createRoute(
      router,
      "/user/{username}".replace(`{${"username"}}`, ":username"),
      "delete",
      "User",
      "deleteUser",
    );

    this.createRoute(
      router,
      "/user/{username}".replace(`{${"username"}}`, ":username"),
      "get",
      "User",
      "getUserByName",
    );

    this.createRoute(
      router,
      "/user/{username}".replace(`{${"username"}}`, ":username"),
      "put",
      "User",
      "updateUser",
    );

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  private createRoute(
    router: Router,
    localVarPath: string,
    httpMethod: string,
    controllerId: string,
    operationId: string,
  ): void {
    const middlewarePromise = async (
      context: RouterContext<string, any, Record<string, any>>,
    ) => {
      const openApiRequest = await OakOpenApiRequest.build(context);
      const response: Response = await this.executeController(
        controllerId,
        operationId,
        openApiRequest,
      );
      context.response.status = response.status;
      context.response.body = await response.json();
      context.response.headers = response.headers;
    };
    if (httpMethod == "get") {
      router.get(localVarPath, middlewarePromise);
    } else if (httpMethod == "post") {
      router.post(localVarPath, middlewarePromise);
    } else if (httpMethod == "delete") {
      router.delete(localVarPath, middlewarePromise);
    } else if (httpMethod == "put") {
      router.put(localVarPath, middlewarePromise);
    } else {
      throw new Error("Unknown HTTP verb: " + httpMethod);
    }
  }

  async startServer(port: number): Promise<void> {
    return await this.app.listen({ port });
  }
}
