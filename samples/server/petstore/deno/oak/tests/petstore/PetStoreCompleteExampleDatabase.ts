import { Pet, StatusEnum } from "../../models/Pet.ts";
import { Tag } from "../../models/Tag.ts";
import { Category } from "../../models/Category.ts";

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
    this.registerPet(0, "doggie", StatusEnum.Available, "tag01");
    this.registerPet(7, "doggo", StatusEnum.Sold, "yo");
    this.registerPet(12, "dog", StatusEnum.Sold);
  }

  private registerPet(id: number, name: string, status: StatusEnum, tag?: string): void {
    const pet = new Pet();
    pet.id = id;
    pet.name = name;
    pet.category = new Category();
    pet.category.id = 0;
    pet.category.name = "string";
    pet.photoUrls = new Array<string>();
    pet.photoUrls.push("string");
    pet.status = status;
    if (tag) {
      const tagObj = new Tag();
      tagObj.id = 0;
      tagObj.name = tag;
      pet.tags = new Array<Tag>();
      pet.tags.push(tagObj);
    }
    this.addPet(pet);
  }
}
