import * as todoModel from "../models/todo.model";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import validationError from "../error/validationError";
import notFoundError from "../error/notFoundError";

export const displayTodos = asyncHandler(async(req:Request,res:Response)=>{
  const todos = todoModel.getTodos();
  res.status(200).json(new ApiResponse(200, todos, "Todos retrieved"));
});

export const createTodo = asyncHandler(async(req:Request,res:Response)=>{
  const {title} = req.body;
  if(title?.trim()===""){
    throw new validationError("Field is empty");
  }
  const todos = todoModel.getTodos();
  const newTodo = {
    id:todos.length+1,
    title,
    completed:false,
  };
  todoModel.addTodo(newTodo);
  res.status(201).json(new ApiResponse(201,todos,"Todo created"));
});

export const updateTodoStatus = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const todo = todoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  const updatedTodo = {
    ...todo,
    completed:!todo.completed,
  };
  todoModel.updateTodo(Number(id),updatedTodo);
  res.status(200).json(new ApiResponse(200,updatedTodo,"Todo updated"));
});

export const updateTodoTitle = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const {title} = req.body;
  if(title?.trim()===""){
    throw new validationError("Field is empty");
  }
  const todo = todoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  const updatedTodo = {
    ...todo,
    title,
  };
  todoModel.updateTodo(Number(id),updatedTodo);
  res.status(200).json(new ApiResponse(200,updatedTodo,"Todo updated"));
});

export const deleteSingleTodo = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const todos = todoModel.getTodos();
  const todo = todoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  todoModel.deleteTodoById(Number(id));
  res.status(200).json(new ApiResponse(200,todos,`Todo with ${id} deleted`));
});

export const deleteAllTodos = asyncHandler(async(req:Request,res:Response)=>{
  const todos = todoModel.getTodos();
  if(todos.length===0){
    throw new notFoundError("Nothing to delete");
  }
  todoModel.deleteAllTodos();
  res.status(200).json(new ApiResponse(200,todos,"All todos deleted"));
});