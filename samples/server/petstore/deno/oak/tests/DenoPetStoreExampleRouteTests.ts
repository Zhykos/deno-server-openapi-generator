import {
  assertEquals,
  fail,
} from "https://deno.land/std@0.127.0/testing/asserts.ts";
import {
  readAll,
  readerFromStreamReader,
} from "https://deno.land/std@0.127.0/streams/conversion.ts";

// Test all routes from example which always returns an error: this tests is built to check if all routes are generated.
// deno test --allow-net --unstable DenoPetStoreExampleRouteTests.ts

const client = Deno.createHttpClient({});

Deno.test("check if route exists for service: PetService >> addPet", async () => {
  const localVarPath = `/pet`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> addPet",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> deletePet", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> deletePet",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> findPetsByStatus", async () => {
  const localVarPath = `/pet/findByStatus`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> findPetsByStatus",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> findPetsByTags", async () => {
  const localVarPath = `/pet/findByTags`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> findPetsByTags",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> getPetById", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> getPetById",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> updatePet", async () => {
  const localVarPath = `/pet`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "PUT",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> updatePet",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> updatePetWithForm", async () => {
  const localVarPath = `/pet/{petId}`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> updatePetWithForm",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: PetService >> uploadFile", async () => {
  const localVarPath = `/pet/{petId}/uploadImage`.replace(
    `{${"petId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: PetService >> uploadFile",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: StoreService >> deleteOrder", async () => {
  const localVarPath = `/store/order/{orderId}`.replace(
    `{${"orderId"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: StoreService >> deleteOrder",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: StoreService >> getInventory", async () => {
  const localVarPath = `/store/inventory`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: StoreService >> getInventory",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: StoreService >> getOrderById", async () => {
  const localVarPath = `/store/order/{orderId}`.replace(
    `{${"orderId"}}`,
    stubParameter("number"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: StoreService >> getOrderById",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: StoreService >> placeOrder", async () => {
  const localVarPath = `/store/order`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: StoreService >> placeOrder",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> createUser", async () => {
  const localVarPath = `/user`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> createUser",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> createUsersWithArrayInput", async () => {
  const localVarPath = `/user/createWithArray`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> createUsersWithArrayInput",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> createUsersWithListInput", async () => {
  const localVarPath = `/user/createWithList`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "POST",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> createUsersWithListInput",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> deleteUser", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "DELETE",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> deleteUser",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> getUserByName", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> getUserByName",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> loginUser", async () => {
  const localVarPath = `/user/login`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> loginUser",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> logoutUser", async () => {
  const localVarPath = `/user/logout`;

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "GET",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> logoutUser",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("check if route exists for service: UserService >> updateUser", async () => {
  const localVarPath = `/user/{username}`.replace(
    `{${"username"}}`,
    stubParameter("string"),
  );

  const res = await fetch("http://localhost:3000" + localVarPath, {
    method: "PUT",
    client,
  });

  const responseReader: ReadableStreamDefaultReader<Uint8Array> | undefined =
    await res.body?.getReader();
  assertEquals(res.status, 500);

  if (responseReader) {
    const reader: Deno.Reader = readerFromStreamReader(responseReader);
    const charArray: Uint8Array = await readAll(reader);
    const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
    assertEquals(jsonObj.code, 500);
    assertEquals(
      jsonObj.error,
      "Method not implemented yet: UserService >> updateUser",
    );
  } else {
    fail("Cannot read body");
  }
});

Deno.test("404 status", async () => {
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
