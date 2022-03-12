import { DsDDB } from "https://deno.land/x/dsddb@v2.1.0/mod.ts";
import { Pet, StatusEnum } from "../../models/Pet.ts";

export const petDatabase = new DsDDB<Pet>();
const pet1 = new Pet();
pet1.id = 1;
pet1.name = "Firulais";
pet1.status = StatusEnum.Pending;
petDatabase.set("pet-1", pet1);
