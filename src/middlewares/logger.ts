import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const diff = Date.now() - start;
    console.log(
      `${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode} - ${diff}ms`
    );
  });

  next();
};
