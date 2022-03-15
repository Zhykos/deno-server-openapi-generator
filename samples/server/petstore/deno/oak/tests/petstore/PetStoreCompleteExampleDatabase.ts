import { DsDDB } from "https://deno.land/x/dsddb@v2.1.0/mod.ts";
import { Pet, StatusEnum } from "../../models/Pet.ts";

export class PetStoreDatabase {
  private petDatabase: DsDDB<Pet>;

  constructor() {
    this.petDatabase = new DsDDB<Pet>();
    this.reset();
  }

  getPet(petId: string): Pet | undefined {
    return this.petDatabase.get(petId);
  }

  reset() {
    this.petDatabase.deleteStore();
    const pet1 = new Pet();
    pet1.id = 1;
    pet1.name = "Firulais";
    pet1.status = StatusEnum.Pending;
    this.petDatabase.set("pet-1", pet1);
  }
}
