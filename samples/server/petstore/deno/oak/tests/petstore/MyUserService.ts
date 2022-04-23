/*
 * Copyright 2022 Thomas "Zhykos" Cicognani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { UserService } from "../../services/UserService.ts";
import { User } from "../../models/User.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";
import { Helpers } from "../../controllers/Helpers.ts";

export class MyUserService implements UserService {
  private createUserInTransaction(
    user: User,
    petStoreDB: PetStoreCompleteExampleDatabase,
  ): void {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    if (!user.username) {
      throw new Deno.errors.InvalidData(`Cannot create user`);
    }

    const existingUser: User | undefined = petStoreDB.getUser(user.username);
    if (existingUser) {
      throw new Deno.errors.InvalidData(
        `Cannot create user with username: '${user.username}'`,
      );
    }
    petStoreDB.addUser(user);
  }

  createUser(user: User): Promise<void> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();
    this.createUserInTransaction(user, petStoreDB);
    return Helpers.wrapPromise();
  }
  createUsersWithArrayInput(users: Array<User>): Promise<void> {
    const petStoreDB = new PetStoreCompleteExampleDatabase();
    users.forEach((user) => this.createUserInTransaction(user, petStoreDB));
    return Helpers.wrapPromise();
  }
  createUsersWithListInput(user: Array<User>): Promise<void> {
    this.createUsersWithArrayInput(user);
    return Helpers.wrapPromise();
  }
  loginUser(username: string, password: string): Promise<string> {
    // TODO Set Headers: X-Expires-After and X-Rate-Limit
    if (username === "zhykos" && password === "azerty") {
      return Helpers.wrapPromise('{ "status": "logged" }');
    }
    throw new Deno.errors.InvalidData("Wrong user identification");
  }
  logoutUser(): Promise<void> {
    return Helpers.wrapPromise();
  }
  deleteUser(username: string): Promise<void> {
    // TODO ERROR 400: Invalid user name format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const user: User | undefined = petStoreDB.getUser(username);
    if (!user) {
      throw new Deno.errors.NotFound(
        `Cannot delete user with username: '${username}'`,
      );
    }
    return Helpers.wrapPromise();
  }
  getUserByName(username: string): Promise<User> {
    // TODO ERROR 400: Invalid user name format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const user: User | undefined = petStoreDB.getUser(username);
    if (user) {
      return Helpers.wrapPromise(user);
    }
    throw new Deno.errors.NotFound(
      `Cannot find user with username: '${username}'`,
    );
  }
  updateUser(username: string, user: User): Promise<void> {
    // TODO ERROR 400: Invalid format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const existingUser: User | undefined = petStoreDB.getUser(username);
    if (!existingUser) {
      throw new Deno.errors.NotFound(
        `Cannot update user with username: '${username}'`,
      );
    }
    existingUser.copyFrom(user);
    return Helpers.wrapPromise();
  }
}
