import { DenoOakServer } from "../../DenoOakServer.ts";
import { MyPetService } from "./MyPetService.ts";
import { MyStoreService } from "./MyStoreService.ts";
import { MyUserService } from "./MyUserService.ts";

// deno run --allow-net --watch PetStoreCompleteExample.ts

const myPetService: MyPetService = new MyPetService();
const myStoreService: MyStoreService = new MyStoreService();
const myUserService: MyUserService = new MyUserService();

new DenoOakServer(3000, myPetService, myStoreService, myUserService).start();
