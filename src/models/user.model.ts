import { User } from "../types/user";
import BaseModel from "./baseModel";

export default class UserModel extends BaseModel {

  static async getUsers() {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users");
  }

  static async getUserById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
      })
      .from("users")
      .where({ id })
      .first();
  }


  static async addUser(user: User) {
    return this.queryBuilder().insert(user).table("users");
  }


  static async deleteUser(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}