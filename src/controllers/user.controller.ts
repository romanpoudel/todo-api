import UserModel from "../models/user.model";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import bcrypt from "bcrypt";
import generateAccessAndRefreshToken from "../utils/tokenGenerator";
import { RequestWithUser } from "../interface/requestUser";
import { options } from "../utils/cookieOption";
import { loginSchema, registerSchema } from "../schemas/user.schema";


export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const {error} = registerSchema.validate(req.body);
    if(error){
      throw new ApiError(400,error.message);
    }
    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const users =await UserModel.getUsers();
    const userExist = users.find(
      (user) => user.email === email || user.username === username
    );
    if (userExist) {
      throw new ApiError(409, "User already exists");
    }
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      username,
      password: hashedPassword,
      refreshToken: "",
    };
    UserModel.addUser(newUser);
    const response = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    res.status(201).json(new ApiResponse(201, response, "User created"));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const users =await UserModel.getUsers();
  const userExist = users.find((user) => user.email === email);
  if (!userExist) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, userExist.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(userExist);
  userExist.refreshToken = refreshToken;

  //for removing password and refreshToken from response
  const response = {
    id: userExist.id,
    username: userExist.username,
    email: userExist.email,
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user: response, accessToken, refreshToken },
        "User logged in"
      )
    );
});

export const logoutUser = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const userExist =await UserModel.getUserById(req.user?.id!);
    if (!userExist) {
      throw new ApiError(404, "User not found");
    }
    userExist.refreshToken = "";

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out"));
  }
);