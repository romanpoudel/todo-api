import { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

type MyError = {
  code: number;
  message: string;
};

const asyncHandler =
  (fn: AsyncRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const err = error as MyError; // Type assertion
      res.status(err.code || 500).json({
        success: false,
        message: err.message,
      });
    }
  };

export default asyncHandler;
