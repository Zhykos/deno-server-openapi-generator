/* eslint-disable no-unused-vars */
import { IUserService } from "./IUserService.ts";
import { User } from "../models/User.ts";

export class UserService {
  private customUserService: IUserService;

  constructor(customUserService: IUserService) {
    this.customUserService = customUserService;
  }

  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * user User Created user object
   * no response value expected for this operation
   */
  createUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUser(user));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithArrayInput(user: Array<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithArrayInput(user));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithListInput(user: Array<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.createUsersWithListInput(user));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
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
  deleteUser(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.deleteUser(username));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Get user by user name
   *
   * username string The name that needs to be fetched. Use user1 for testing.
   * returns User
   */
  getUserByName(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.getUserByName(username));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
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
  loginUser(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.loginUser(username, password));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
  /**
   * Logs out current logged in user session
   *
   * no response value expected for this operation
   */
  logoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.logoutUser());
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
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
  updateUser(username: string, user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.customUserService.updateUser(username, user));
      } catch (e) {
        reject({
          error: e.message || "Invalid input",
          code: e.status || 405,
        });
      }
    });
  }
}
