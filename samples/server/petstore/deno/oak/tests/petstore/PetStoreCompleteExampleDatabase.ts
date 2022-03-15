import { Pet } from "../../models/Pet.ts";

export class PetStoreDatabase {
  private petDatabase: Map<string, Pet>;

  constructor() {
    this.petDatabase = new Map<string, Pet>();
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

  allPetsIterator(): IterableIterator<Pet> {
    return this.petDatabase.values();
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
    this.addPet(pet0);
  }
}
