import { PetService } from './services/PetService.ts';
import { StoreService } from './services/StoreService.ts';
import { UserService } from './services/UserService.ts';

export interface DenoServer {
  create(port: number | 3000, myPetService: PetService, myStoreService: StoreService, myUserService: UserService): DenoServer;

  start(): DenoServer;
}