import { UserService } from "../../services/UserService.ts";
import { User } from "../../models/User.ts";
import { PetStoreCompleteExampleDatabase } from "./PetStoreCompleteExampleDatabase.ts";

export class MyUserService implements UserService {
  createUser(_user: User): void {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    throw new Error("Method not implemented yet: UserService >> createUser");
  }
  createUsersWithArrayInput(_user: Array<User>): void {
    // TODO ERROR 405: Validation exception (model format / JSON format)
    throw new Error(
      "Method not implemented yet: UserService >> createUsersWithArrayInput",
    );
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
  deleteUser(_username: string): void {
    throw new Error("Method not implemented yet: UserService >> deleteUser");
  }
  getUserByName(username: string): User {
    // TODO ERROR 400: Invalid user name format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const user: User | undefined = petStoreDB.getUser(username);
    if (user) {
      return user;
    }
    throw new Deno.errors.NotFound(`Cannot find user with ID: '${username}'`);
  }
  updateUser(username: string, user: User): void {
    // TODO ERROR 400: Invalid format (do not know how to check that)
    const petStoreDB = new PetStoreCompleteExampleDatabase();

    const existingUser: User | undefined = petStoreDB.getUser(username);
    if (!existingUser) {
      throw new Deno.errors.NotFound(`Cannot update user with ID: '${username}'`);
    }
    existingUser.copyFrom(user);
  }
}
