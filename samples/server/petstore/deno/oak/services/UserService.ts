/* eslint-disable no-unused-vars */
import { Service } from "./Service.ts";
import { User } from "../models/User.ts";

export class UserService {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * user User Created user object
   * no response value expected for this operation
   */
  static createUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          user,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  static createUsersWithArrayInput(user: Array<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          user,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  static createUsersWithListInput(user: Array<User>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          user,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
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
  static deleteUser(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          username,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Get user by user name
   *
   * username string The name that needs to be fetched. Use user1 for testing.
   * returns User
   */
  static getUserByName(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          username,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
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
  static loginUser(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          username,
          password,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
  /**
   * Logs out current logged in user session
   *
   * no response value expected for this operation
   */
  static logoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
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
  static updateUser(username: string, user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        /*resolve(Service.successResponse({
          username,
          user,
        }));*/
      } catch (e) {
        reject(Service.rejectResponse(
          e.message || "Invalid input",
          e.status || 405,
        ));
      }
    });
  }
}
