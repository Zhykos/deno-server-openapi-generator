import { User } from "../models/User.ts";

export interface UserService {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * user User Created user object
   * no response value expected for this operation
   */
  createUser(user: User): Promise<void>;
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithArrayInput(user: Array<User>): Promise<void>;
  /**
   * Creates list of users with given input array
   *
   * user Array<User> List of user object
   * no response value expected for this operation
   */
  createUsersWithListInput(user: Array<User>): Promise<void>;
  /**
   * Delete user
   * This can only be done by the logged in user.
   *
   * username string The name that needs to be deleted
   * no response value expected for this operation
   */
  deleteUser(username: string): Promise<void>;
  /**
   * Get user by user name
   *
   * username string The name that needs to be fetched. Use user1 for testing.
   * returns User
   */
  getUserByName(username: string): Promise<User>;
  /**
   * Logs user into the system
   *
   * username string The user name for login
   * password string The password for login in clear text
   * returns string
   */
  loginUser(username: string, password: string): Promise<string>;
  /**
   * Logs out current logged in user session
   *
   * no response value expected for this operation
   */
  logoutUser(): Promise<void>;
  /**
   * Updated user
   * This can only be done by the logged in user.
   *
   * username string name that need to be deleted
   * user User Updated user object
   * no response value expected for this operation
   */
  updateUser(username: string, user: User): Promise<void>;
}
