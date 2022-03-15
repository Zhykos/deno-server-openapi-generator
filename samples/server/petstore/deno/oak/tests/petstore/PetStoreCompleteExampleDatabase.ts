import { DsDDB } from "https://deno.land/x/dsddb@v2.1.0/mod.ts";
import { Pet } from "../../models/Pet.ts";

export class PetStoreDatabase {
  private petDatabase: DsDDB<Pet>;

  constructor() {
    this.petDatabase = new DsDDB<Pet>();
    this.initDatabase();
  }

  private getPetIdForDatabaseFromObject(pet: Pet): string {
    return `pet-${pet.id}`;
  }

  getPet(petId: string): Pet | undefined {
    return this.petDatabase.get(petId);
  }

  addPet(pet: Pet): void {
    this.petDatabase.set(this.getPetIdForDatabaseFromObject(pet), pet);
  }

  private initDatabase() {
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
    this.petDatabase.set(this.getPetIdForDatabaseFromObject(pet0), pet0);
  }
}
