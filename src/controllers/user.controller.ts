import * as userModel from "../models/user.model";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import bcrypt from "bcrypt";
import generateAccessAndRefreshToken from "../utils/tokenGenerator";
import { RequestWithUser } from "../interface/requestUser";
import config from "../config";
import jwt from "jsonwebtoken";

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
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      username,
      password: hashedPassword,
      refreshToken: "",
    };
    userModel.addUser(newUser);
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

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(userExist);
  userExist.refreshToken = refreshToken;

  //for removing password and refreshToken from response
  const response = {
    id: userExist.id,
    username: userExist.username,
    email: userExist.email,
  };
  const options = {
    httpOnly: true,
    secure: config.environment === "production" ? true : false,
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
    const userExist = userModel.getUserById(req.user?.id!);
    if (!userExist) {
      throw new ApiError(404, "User not found");
    }
    userExist.refreshToken = "";

    const options = {
      httpOnly: true,
      secure: config.environment === "production" ? true : false,
    };
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out"));
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request");
    }
    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        config.jwt.refreshTokenSecret!
      ) as jwt.JwtPayload;
      const user = userModel.getUserById(decodedToken.id);
      if (!user) {
        throw new ApiError(401, "Invalid refresh token");
      }
      if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user);

      const options = {
        httpOnly: true,
        secure: config.environment === "production" ? true : false,
      };
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            { accessToken, refreshToken },
            "Access token refreshed"
          )
        );
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
  }
);
