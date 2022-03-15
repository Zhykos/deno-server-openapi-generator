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
    const pet0 = new Pet().copyFrom({
      "id": 0,
      "category": {
        "id": 0,
        "name": "string",
      },
      "name": "doggie",
      "photoUrls": [
        "string",
      ],
      "tags": [
        {
          "id": 0,
          "name": "string",
        },
      ],
      "status": "available",
    });
    this.petDatabase.set("pet-0", pet0);
  }
}
