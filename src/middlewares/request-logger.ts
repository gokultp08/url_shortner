import { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const diff = Date.now() - start;
    const formattedStart = new Date(start).toUTCString();
    console.log(
      `${req.ip} ${formattedStart} ${req.method} ${req.originalUrl} ${res.statusCode} - ${diff}ms`
    );
  });

  next();
};
