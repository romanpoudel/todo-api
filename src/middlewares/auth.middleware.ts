import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import config from "../config";
import { getUserById } from "../models/user.model";
import { NextFunction } from "express";
import { RequestWithUser } from "../interface/requestUser";

export const verifyJWT = asyncHandler(
  async (req: RequestWithUser, _, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new ApiError(401, "Unauthorized");
      }
      const decodedToken = jwt.verify(
        token,
        config.jwt.accessTokenSecret!
      ) as jwt.JwtPayload;
      const user = getUserById(decodedToken.id);
      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }
      req.user = user;
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
