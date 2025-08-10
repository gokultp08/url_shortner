import { NextFunction, Request, Response } from "express";

const createShortUrl = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({
    message: "Short URL created successfully",
    data: {},
  });
};

const getUrlFromShortUrl = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({
    message: "Short URL not found",
  });
};

export default {
  createShortUrl,
  getUrlFromShortUrl,
};
