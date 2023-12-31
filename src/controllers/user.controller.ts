import * as userModel from "../models/user.model";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const users = userModel.getUsers();
    const userExist = users.find(
      (user) => user.email === email || user.username === username
    );
    if (userExist) {
      throw new ApiError(409, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser ={
      id: users.length + 1,
      email,
      username,
      password: hashedPassword,
    }
    userModel.addUser(newUser);
    res.status(201).json(new ApiResponse(201, newUser, "User created"));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const users = userModel.getUsers();
  const userExist = users.find((user) => user.email === email);
  if (!userExist) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, userExist.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  res.status(201).json(new ApiResponse(201, userExist, "User logged in"));
});
