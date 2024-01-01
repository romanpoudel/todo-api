import { Router } from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteSingleTodo,
  displayTodos,
  updateTodoStatus,
  updateTodoTitle,
} from "../controllers/todo.controller";

const router = Router();

router.route("/").get(displayTodos).post(createTodo).delete(deleteAllTodos);

router
  .route("/:id")
  .put(updateTodoTitle)
  .patch(updateTodoStatus)
  .delete(deleteSingleTodo);

export default router;
