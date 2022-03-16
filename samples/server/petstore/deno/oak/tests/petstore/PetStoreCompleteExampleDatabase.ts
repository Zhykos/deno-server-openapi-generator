import { Pet, StatusEnum as PetStatus } from "../../models/Pet.ts";
import { Tag } from "../../models/Tag.ts";
import { Category } from "../../models/Category.ts";
import { Order, StatusEnum as OrderStatus } from "../../models/Order.ts";

export class PetStoreCompleteExampleDatabase {
  private petDatabase: Map<string, Pet>;
  private orderDatabase: Map<string, Order>;

  constructor() {
    this.petDatabase = new Map<string, Pet>();
    this.orderDatabase = new Map<string, Order>();
    this.initDatabase();
  }

  // Pets -------------------------------------------------------

  private static PET_PREFIX = "pet-";

  private getPetIdForDatabaseFromObject(pet: Pet): string {
    return PetStoreCompleteExampleDatabase.PET_PREFIX + pet.id;
  }

  getPet(petId: number): Pet | undefined {
    return this.petDatabase.get(
      PetStoreCompleteExampleDatabase.PET_PREFIX + petId,
    );
  }

  addPet(pet: Pet): void {
    this.petDatabase.set(this.getPetIdForDatabaseFromObject(pet), pet);
  }

  allPetsIterator(): IterableIterator<Pet> {
    return this.petDatabase.values();
  }

  private registerPet(
    id: number,
    name: string,
    status: PetStatus,
    tags: Array<string>,
  ): void {
    const pet = new Pet();
    pet.id = id;
    pet.name = name;
    pet.category = new Category();
    pet.category.id = 0;
    pet.category.name = "string";
    pet.photoUrls = new Array<string>();
    pet.photoUrls.push("string");
    pet.status = status;
    if (tags.length > 0) {
      pet.tags = new Array<Tag>();
      let tagId = 0;
      tags.forEach((tag) => {
        const tagObj = new Tag();
        tagObj.id = tagId++;
        tagObj.name = tag;
        pet.tags?.push(tagObj);
      });
    }
    this.addPet(pet);
  }

  // Orders -------------------------------------------------------

  private static ORDER_PREFIX = "order-";

  private getOrderIdForDatabaseFromObject(order: Order): string {
    return PetStoreCompleteExampleDatabase.ORDER_PREFIX + order.id;
  }

  getOrder(orderId: number): Order | undefined {
    return this.orderDatabase.get(
      PetStoreCompleteExampleDatabase.ORDER_PREFIX + orderId,
    );
  }

  addOrder(order: Order): void {
    this.orderDatabase.set(this.getOrderIdForDatabaseFromObject(order), order);
  }

  private registerOrder(id: number): void {
    const order = new Order();
    order.id = id;
    order.petId = id;
    order.quantity = 0;
    order.shipDate = "";
    order.status = OrderStatus.Placed;
    order.complete = true;
    this.addOrder(order);
  }

  // Misc. -------------------------------------------------------

  private initDatabase(): void {
    this.registerPet(0, "doggie", PetStatus.Available, ["tag01"]);
    this.registerPet(7, "doggo", PetStatus.Sold, ["yo", "cute"]);
    this.registerPet(12, "dog", PetStatus.Sold, []);

    this.registerOrder(0);
    this.registerOrder(1);
  }
}
