import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  status?: number;
}

export const customErrorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
