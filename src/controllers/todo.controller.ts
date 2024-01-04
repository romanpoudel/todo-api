import TodoModel from "../models/todo.model";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import validationError from "../error/validationError";
import notFoundError from "../error/notFoundError";
import { buildMeta,getPaginationOptions } from "../utils/pagination";

export const displayTodos = asyncHandler(async(req:Request,res:Response)=>{
  const { page, size } = req.query;
  const parsedPage = parseInt(page as string);
  const parsedSize = parseInt(size as string);
  const pageDetails = getPaginationOptions({ page: parsedPage, size: parsedSize });
  const projectsPromise =await TodoModel.getAll({ ...pageDetails, page: parsedPage, size: parsedSize });
  const countPromise =await TodoModel.countAll(req.query);
  const [projects, count] = await Promise.all([projectsPromise, countPromise]);
  const total = count.count;
  const meta = buildMeta(total, parsedSize, parsedPage);
  const todos = {
    meta,
    projects,
  };
  res.status(200).json(new ApiResponse(200, todos, "Todos retrieved"));
});

export const createTodo = asyncHandler(async(req:Request,res:Response)=>{
  const {title} = req.body;
  if(title?.trim()===""){
    throw new validationError("Field is empty");
  }
  const todos =await TodoModel.getTodos();
  const newTodo = {
    id:todos.length+1,
    title,
    completed:false,
  };
  TodoModel.addTodo(newTodo);
  res.status(201).json(new ApiResponse(201,todos,"Todo created"));
});

export const updateTodoStatus = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const todo =await TodoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  const updatedTodo = {
    ...todo,
    completed:!todo.completed,
  };
  TodoModel.updateTodo(Number(id),{ ...updatedTodo, id: todo.id, title: todo.title });
  res.status(200).json(new ApiResponse(200,updatedTodo,"Todo updated"));
});

export const updateTodoTitle = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const {title} = req.body;
  if(title?.trim()===""){
    throw new validationError("Field is empty");
  }
  const todo = await TodoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  const updatedTodo = {
    ...todo,
    title,
  };
  TodoModel.updateTodo(Number(id),updatedTodo);
  res.status(200).json(new ApiResponse(200,updatedTodo,"Todo updated"));
});

export const deleteSingleTodo = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const todos = TodoModel.getTodos();
  const todo = TodoModel.getTodoById(Number(id));
  if(!todo){
    throw new notFoundError("Todo not found");
  }
  TodoModel.deleteTodoById(Number(id));
  res.status(200).json(new ApiResponse(200,todos,`Todo with ${id} deleted`));
});

export const deleteAllTodos = asyncHandler(async(req:Request,res:Response)=>{
  const todos =await TodoModel.getTodos();
  if(todos.length===0){
    throw new notFoundError("Nothing to delete");
  }
  TodoModel.deleteAllTodos();
  res.status(200).json(new ApiResponse(200,todos,"All todos deleted"));
});