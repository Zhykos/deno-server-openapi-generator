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
    const { user } = args[0];
    const userCast = new User(user);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUser(userCast));
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
    const { user } = args[0];
    const userCast = new Array<User>();
    userCast.push(user);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithArrayInput(userCast));
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
    const { user } = args[0];
    const userCast = new Array<User>();
    userCast.push(user);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithListInput(userCast));
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
    const { username, password } = args[0];
    const usernameCast = String(username);
    const passwordCast = String(password);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.loginUser(usernameCast, passwordCast));
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
    const { username } = args[0];
    const usernameCast = String(username);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.deleteUser(usernameCast));
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
    const { username } = args[0];
    const usernameCast = String(username);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.getUserByName(usernameCast));
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
    const { username, user } = args[0];
    const usernameCast = String(username);
    const userCast = new User(user);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.updateUser(usernameCast, userCast));
      } catch (e) {
        reject(e);
      }
    });
  }
}
