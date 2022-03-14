import { assertEquals, fail, readAll, readerFromStreamReader } from "./deps.ts";

// Test all routes from example which always returns an error: this tests is built to check if all routes are generated.
// deno test --allow-net --unstable DummyRoutesTests.ts

const client = Deno.createHttpClient({});

Deno.test("check if route exists for service: PetService >> addPet (test id Pet-1)", async () => {
  const localVarPath = "/pet";
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: PetService >> addPet",
    "pet",
  );
});

Deno.test("check if route exists for service: PetService >> updatePet (test id Pet-2)", async () => {
  const localVarPath = "/pet";
  await assertRouteResult(
    localVarPath,
    "PUT",
    "Method not implemented yet: PetService >> updatePet",
    "pet",
  );
});

Deno.test("check if route exists for service: PetService >> findPetsByStatus (test id Pet-3)", async () => {
  const localVarPath = "/pet/findByStatus";
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: PetService >> findPetsByStatus",
    "",
  );
});

Deno.test("check if route exists for service: PetService >> findPetsByTags (test id Pet-4)", async () => {
  const localVarPath = "/pet/findByTags";
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: PetService >> findPetsByTags",
    "",
  );
});

Deno.test("check if route exists for service: PetService >> deletePet (test id Pet-5)", async () => {
  const localVarPath = "/pet/{petId}".replace(
    '{${"petId"}}',
    stubParameter("number"),
  );
  await assertRouteResult(
    localVarPath,
    "DELETE",
    "Method not implemented yet: PetService >> deletePet",
    "",
  );
});

Deno.test("check if route exists for service: PetService >> getPetById (test id Pet-6)", async () => {
  const localVarPath = "/pet/{petId}".replace(
    '{${"petId"}}',
    stubParameter("number"),
  );
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: PetService >> getPetById",
    "",
  );
});

Deno.test("check if route exists for service: PetService >> updatePetWithForm (test id Pet-7)", async () => {
  const localVarPath = "/pet/{petId}".replace(
    '{${"petId"}}',
    stubParameter("number"),
  );
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: PetService >> updatePetWithForm",
    "",
  );
});

Deno.test("check if route exists for service: PetService >> uploadFile (test id Pet-8)", async () => {
  const localVarPath = "/pet/{petId}/uploadImage".replace(
    '{${"petId"}}',
    stubParameter("number"),
  );
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: PetService >> uploadFile",
    "",
  );
});

Deno.test("check if route exists for service: StoreService >> getInventory (test id Store-1)", async () => {
  const localVarPath = "/store/inventory";
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: StoreService >> getInventory",
    "",
  );
});

Deno.test("check if route exists for service: StoreService >> placeOrder (test id Store-2)", async () => {
  const localVarPath = "/store/order";
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: StoreService >> placeOrder",
    "order",
  );
});

Deno.test("check if route exists for service: StoreService >> deleteOrder (test id Store-3)", async () => {
  const localVarPath = "/store/order/{orderId}".replace(
    '{${"orderId"}}',
    stubParameter("string"),
  );
  await assertRouteResult(
    localVarPath,
    "DELETE",
    "Method not implemented yet: StoreService >> deleteOrder",
    "",
  );
});

Deno.test("check if route exists for service: StoreService >> getOrderById (test id Store-4)", async () => {
  const localVarPath = "/store/order/{orderId}".replace(
    '{${"orderId"}}',
    stubParameter("number"),
  );
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: StoreService >> getOrderById",
    "",
  );
});

Deno.test("check if route exists for service: UserService >> createUser (test id User-1)", async () => {
  const localVarPath = "/user";
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: UserService >> createUser",
    "user",
  );
});

Deno.test("check if route exists for service: UserService >> createUsersWithArrayInput (test id User-2)", async () => {
  const localVarPath = "/user/createWithArray";
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: UserService >> createUsersWithArrayInput",
    "user",
  );
});

Deno.test("check if route exists for service: UserService >> createUsersWithListInput (test id User-3)", async () => {
  const localVarPath = "/user/createWithList";
  await assertRouteResult(
    localVarPath,
    "POST",
    "Method not implemented yet: UserService >> createUsersWithListInput",
    "user",
  );
});

Deno.test("check if route exists for service: UserService >> loginUser (test id User-4)", async () => {
  const localVarPath = "/user/login";
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: UserService >> loginUser",
    "",
  );
});

Deno.test("check if route exists for service: UserService >> logoutUser (test id User-5)", async () => {
  const localVarPath = "/user/logout";
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: UserService >> logoutUser",
    "",
  );
});

Deno.test("check if route exists for service: UserService >> deleteUser (test id User-6)", async () => {
  const localVarPath = "/user/{username}".replace(
    '{${"username"}}',
    stubParameter("string"),
  );
  await assertRouteResult(
    localVarPath,
    "DELETE",
    "Method not implemented yet: UserService >> deleteUser",
    "",
  );
});

Deno.test("check if route exists for service: UserService >> getUserByName (test id User-7)", async () => {
  const localVarPath = "/user/{username}".replace(
    '{${"username"}}',
    stubParameter("string"),
  );
  await assertRouteResult(
    localVarPath,
    "GET",
    "Method not implemented yet: UserService >> getUserByName",
    "",
  );
});

Deno.test("check if route exists for service: UserService >> updateUser (test id User-8)", async () => {
  const localVarPath = "/user/{username}".replace(
    '{${"username"}}',
    stubParameter("string"),
  );
  await assertRouteResult(
    localVarPath,
    "PUT",
    "Method not implemented yet: UserService >> updateUser",
    "user",
  );
});

Deno.test("404 status on root URL", async () => {
  const res = await fetch("http://localhost:3000/", {
    method: "GET",
    client,
  });
  await res.body?.cancel();
  assertEquals(res.status, 404);
});

Deno.test("404 status on specific URL", async () => {
  const res = await fetch("http://localhost:3000/zhykos404", {
    method: "GET",
    client,
  });
  await res.body?.cancel();
  assertEquals(res.status, 404);
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

async function assertRouteResult(
  localVarPath: string,
  httpMethod: string,
  expectedErrorMessage: string,
  bodyParamName: string,
): Promise<void> {
  let body: BodyInit | null | undefined = null;
  if (bodyParamName !== "") {
    body = "{}";
  }
  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: httpMethod,
    body: body,
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const decodedBody: string = new TextDecoder().decode(charArray);
    let jsonObj;
    try {
      jsonObj = JSON.parse(decodedBody);
    } catch (e) {
      fail("Cannot parse JSON body response: " + decodedBody + "\n" + e);
    }
    assertEquals(jsonObj.message, expectedErrorMessage);
  } else {
    fail("Cannot read body");
  }
}
