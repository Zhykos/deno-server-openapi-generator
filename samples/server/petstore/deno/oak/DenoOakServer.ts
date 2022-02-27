import { PetService } from "./services/PetService.ts";
// import { PetPrivateService } from "./services/PetPrivateService.ts";
// import { PetController } from "./controllers/PetController.ts";
import { StoreService } from "./services/StoreService.ts";
// import { StorePrivateService } from "./services/StorePrivateService.ts";
// import { StoreController } from "./controllers/StoreController.ts";
import { UserService } from "./services/UserService.ts";
// import { UserPrivateService } from "./services/UserPrivateService.ts";
// import { UserController } from "./controllers/UserController.ts";
import { DenoServer } from "./DenoServer.ts";
import { Application, Router } from "./deps.ts";
import {OakOpenApiRequest} from "./controllers/OakOpenApiRequest.ts";

export class DenoOakServer extends DenoServer {
  private app: Application;

  constructor(
    port: number,
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService
  ) {
    super(port, myPetService, myStoreService, myUserService);
    this.app = new Application();
  }

  generateRoutes() : void{
    const router = new Router();
    router.get("/", (context) => {
      context.response.body = "Hello world!";
    });

    let localVarPath: string;

    localVarPath = `/pet`;
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router.delete(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/findByStatus`;
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/findByTags`;
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router.get(localVarPath, async (context) => {
      console.log(`/pet/{petId}`);
      const openApiRequest: OakOpenApiRequest = new OakOpenApiRequest(context);
      try {
      const response: Response = await this.petController("getPetById", openApiRequest);
      context.response.status = response.status;
      context.response.body= await response.text();
      console.log("my object: %o", response)
      } catch (e) {
        context.response.status = 500;
        context.response.body = e;
        console.error(e);
      }
    });

    localVarPath = `/pet`;
    router.put(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/{petId}`.replace(`{${"petId"}}`, ":petId");
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/pet/{petId}/uploadImage`.replace(`{${"petId"}}`, ":petId");
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId"
    );
    router.delete(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/store/inventory`;
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/store/order/{orderId}`.replace(
      `{${"orderId"}}`,
      ":orderId"
    );
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/store/order`;
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user`;
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/createWithArray`;
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/createWithList`;
    router.post(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router.delete(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/login`;
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/logout`;
    router.get(localVarPath, (context) => {
      context.response.status = 500;
    });

    localVarPath = `/user/{username}`.replace(`{${"username"}}`, ":username");
    router.put(localVarPath, (context) => {
      context.response.status = 500;
    });

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async startServer(port: number): Promise<void> {
    return await this.app.listen({ port });
  }
}
