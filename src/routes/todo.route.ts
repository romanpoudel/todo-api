import { Router } from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteSingleTodo,
  displayTodos,
  updateTodoStatus,
  updateTodoTitle,
} from "../controllers/todo.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(verifyJWT,displayTodos).post(verifyJWT,createTodo).delete(verifyJWT,deleteAllTodos);

router
  .route("/:id")
  .put(verifyJWT,updateTodoTitle)
  .patch(verifyJWT,updateTodoStatus)
  .delete(verifyJWT,deleteSingleTodo);

export default router;
