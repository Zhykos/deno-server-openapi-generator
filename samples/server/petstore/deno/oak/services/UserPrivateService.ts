import { UserService } from "./UserService.ts";
import { User } from "../models/User.ts";

export class UserPrivateService {
  private customUserService: UserService;

  constructor(customUserService: UserService) {
    this.customUserService = customUserService;
  }

  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * user User Created user object
   * no response value expected for this operation
   */
  createUser(...args: any): Promise<void> {
    const user: User = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUser(user));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithArrayInput(...args: any): Promise<void> {
    const user: Array<User> = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithArrayInput(user));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithListInput(...args: any): Promise<void> {
    const user: Array<User> = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithListInput(user));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Logs user into the system
   *
   * username string The user name for login
   * password string The password for login in clear text
   * returns string
   */
  loginUser(...args: any): Promise<string> {
    const username: string = args[1 - 1];
    const password: string = args[2 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.loginUser(username, password));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Logs out current logged in user session
   *
   * no response value expected for this operation
   */
  logoutUser(..._args: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.logoutUser());
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Delete user
   * This can only be done by the logged in user.
   *
   * username string The name that needs to be deleted
   * no response value expected for this operation
   */
  deleteUser(...args: any): Promise<void> {
    const username: string = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.deleteUser(username));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Get user by user name
   *
   * username string The name that needs to be fetched. Use user1 for testing.
   * returns User
   */
  getUserByName(...args: any): Promise<User> {
    const username: string = args[1 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.getUserByName(username));
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Updated user
   * This can only be done by the logged in user.
   *
   * username string name that need to be deleted
   * user User Updated user object
   * no response value expected for this operation
   */
  updateUser(...args: any): Promise<void> {
    const username: string = args[1 - 1];
    const user: User = args[2 - 1];
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.updateUser(username, user));
      } catch (e) {
        reject(e);
      }
    });
  }
}
