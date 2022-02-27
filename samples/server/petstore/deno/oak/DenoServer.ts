import { PetService } from "./services/PetService.ts";
import { StoreService } from "./services/StoreService.ts";
import { UserService } from "./services/UserService.ts";

export interface DenoServer {
  create(
    port: number,
    myPetService: PetService,
    myStoreService: StoreService,
    myUserService: UserService,
  ): DenoServer;

  start(): Promise<void>;
}

export function launchServer(
  middleware: DenoServer,
  port: number,
  myPetService: PetService,
  myStoreService: StoreService,
  myUserService: UserService,
): Promise<void> {
  return middleware
    .create(port, myPetService, myStoreService, myUserService)
    .start();
}
