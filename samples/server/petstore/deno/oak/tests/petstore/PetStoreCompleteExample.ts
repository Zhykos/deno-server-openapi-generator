import { DenoOakServer } from "../../DenoOakServer.ts";
import { MyPetService } from "./MyPetService.ts";
import { MyStoreService } from "./MyStoreService.ts";
import { MyUserService } from "./MyUserService.ts";

// deno run --allow-net --allow-write --watch PetStoreCompleteExample.ts

const myPetService = new MyPetService();
const myStoreService = new MyStoreService();
const myUserService = new MyUserService();

new DenoOakServer(3000, myPetService, myStoreService, myUserService).start();
