import { Todo } from "../types/todo";
import BaseModel from "./baseModel";

export default class TodoModel extends BaseModel {
  static async getTodos() {
    return this.queryBuilder()
      .select({
        id: "t.id",
        title: "title",
        completed: "completed",
        createdBy: "created_by",
        username: "u.username",
      })
      .from({ t: "todos" })
      .leftJoin({ u: "users" }, { "t.created_by": "u.id" });
  }

  static async getTodoById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("todos")
      .where({ id })
      .first();
  }

  static async addTodo(todo: Todo) {
    return this.queryBuilder().insert(todo).table("todos");
  }

  static async updateTodo(id: number, todo: Todo) {
    return this.queryBuilder().update(todo).table("todos").where({ id });
  }

  static async deleteTodoById(id: number) {
    return this.queryBuilder().table("todos").where({ id }).del();
  }

  static async deleteAllTodos() {
    return this.queryBuilder().table("todos").del();
  }
}