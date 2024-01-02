import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import permissionDenied from "../error/permissionDenied";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.stack) {
    logger.error(err.stack);
  }
  if (err instanceof permissionDenied) {
    return res.status(403).json({ message: err.message });
  }

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      type: err.name || "InternalServerError",
    },
  });
};
