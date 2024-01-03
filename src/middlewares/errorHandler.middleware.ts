import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import permissionDenied from "../error/permissionDenied";
import ServerError from "../error/serverError";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.stack) {
    logger.error(err.stack);
  }
  if (err instanceof permissionDenied) {
    return res.status(403).json({ message: err.message });
  }

  if (err instanceof ServerError) {
    return res.status(500).json({ message: err.message });
  }
  next();
};
