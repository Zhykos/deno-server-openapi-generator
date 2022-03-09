import { DsDDB } from "https://deno.land/x/dsddb@v2.1.0/mod.ts";
import { Pet } from "../../models/Pet.ts";

export const petDatabase = new DsDDB<Pet>();