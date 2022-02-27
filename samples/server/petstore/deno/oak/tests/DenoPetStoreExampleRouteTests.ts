import { launchServer } from "../DenoServer.ts";
import { PetService } from "../services/PetService.ts";
import { StoreService } from "../services/StoreService.ts";
import { UserService } from "../services/UserService.ts";
import { ApiResponse } from "../models/ApiResponse.ts";
import { Order } from "../models/Order.ts";
import { Pet } from "../models/Pet.ts";
import { User } from "../models/User.ts";
import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";

// Test all routes from example which always returns an error: this tests is built to check if all routes are generated.

const client = Deno.createHttpClient({});

Deno.test("PetService >> addPet", async () => {
  const localVarPath = `/pet`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> deletePet", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> findPetsByStatus", async () => {
  const localVarPath = `/pet/findByStatus`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> findPetsByTags", async () => {
  const localVarPath = `/pet/findByTags`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> getPetById", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> updatePet", async () => {
  const localVarPath = `/pet`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "PUT",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> updatePetWithForm", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("PetService >> uploadFile", async () => {
  const localVarPath = `/pet/{petId}/uploadImage`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("StoreService >> deleteOrder", async () => {
  const localVarPath = `/store/order/{orderId}`.replace(
    `{${"orderId"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("StoreService >> getInventory", async () => {
  const localVarPath = `/store/inventory`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("StoreService >> getOrderById", async () => {
  const localVarPath = `/store/order/{orderId}`.replace(
    `{${"orderId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("StoreService >> placeOrder", async () => {
  const localVarPath = `/store/order`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> createUser", async () => {
  const localVarPath = `/user`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> createUsersWithArrayInput", async () => {
  const localVarPath = `/user/createWithArray`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> createUsersWithListInput", async () => {
  const localVarPath = `/user/createWithList`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> deleteUser", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> getUserByName", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> loginUser", async () => {
  const localVarPath = `/user/login`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> logoutUser", async () => {
  const localVarPath = `/user/logout`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });
  assertEquals(res.status, 500);
});

Deno.test("UserService >> updateUser", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "PUT",
    client,
  });
  assertEquals(res.status, 500);
});

function stubParameter(paramType: string): string {
  if (paramType == "number") {
    return encodeURIComponent(String("1"));
  }
  if (paramType == "string") {
    return encodeURIComponent(String("foo"));
  }
  throw new Error("Unknown type to stub: " + paramType);
}
