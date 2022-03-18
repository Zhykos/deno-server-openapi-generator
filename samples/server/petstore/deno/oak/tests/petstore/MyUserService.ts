import { UserService } from "../../services/UserService.ts";
import { User } from "../../models/User.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";

export class MyUserService implements UserService {
  createUser(user: User): void {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    if (!user.username) {
      throw new Deno.errors.InvalidData(`Cannot create user`);
    }
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const existingUser: User | undefined = petStoreDB.getUser(user.username);
    if (existingUser) {
      throw new Deno.errors.InvalidData(
        `Cannot create user with username: '${user.username}'`,
      );
    }
    petStoreDB.addUser(user);
  }
  createUsersWithArrayInput(users: Array<User>): void {
    users.forEach((user) => this.createUser(user));
  }
  createUsersWithListInput(_user: Array<User>): void {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithListInput",
    );
  }
  loginUser(_username: string, _password: string): string {
    throw new Error("Method not implemented yet: UserService >> loginUser");
  }
  logoutUser(): void {
    throw new Error("Method not implemented yet: UserService >> logoutUser");
  }
  deleteUser(username: string): void {
    // TODO ERROR 400: Invalid user name format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const user: User | undefined = petStoreDB.getUser(username);
    if (!user) {
      throw new Deno.errors.NotFound(
        `Cannot delete user with username: '${username}'`,
      );
    }
  }
  getUserByName(username: string): User {
    // TODO ERROR 400: Invalid user name format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const user: User | undefined = petStoreDB.getUser(username);
    if (user) {
      return user;
    }
    throw new Deno.errors.NotFound(
      `Cannot find user with username: '${username}'`,
    );
  }
  updateUser(username: string, user: User): void {
    // TODO ERROR 400: Invalid format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const existingUser: User | undefined = petStoreDB.getUser(username);
    if (!existingUser) {
      throw new Deno.errors.NotFound(
        `Cannot update user with username: '${username}'`,
      );
    }
    existingUser.copyFrom(user);
  }
}
