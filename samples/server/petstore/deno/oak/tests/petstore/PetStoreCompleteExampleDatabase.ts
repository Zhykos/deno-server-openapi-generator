import { Pet, StatusEnum } from "../../models/Pet.ts";

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

  private initDatabase(): void {
    this.registerPet(0, "doggie", StatusEnum.Available);
    this.registerPet(7, "doggo", StatusEnum.Sold);
  }

  private registerPet(id: number, name: string, status: StatusEnum): void {
    const pet = new Pet().copyFrom({
      "id": id,
      "category": {
        "id": 0,
        "name": "string",
      },
      "name": name,
      "photoUrls": [
        "string",
      ],
      "tags": [
        {
          "id": 0,
          "name": "string",
        },
      ],
      "status": status.toString(),
    });
    this.addPet(pet);
  }
}
