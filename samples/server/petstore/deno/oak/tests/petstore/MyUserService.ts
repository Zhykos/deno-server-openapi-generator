import { UserService } from "../../services/UserService.ts";
import { User } from "../../models/User.ts";

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
  getUserByName(_username: string): User {
    throw new Error("Method not implemented yet: UserService >> getUserByName");
  }
  updateUser(_username: string, _user: User): void {
    throw new Error("Method not implemented yet: UserService >> updateUser");
  }
}
