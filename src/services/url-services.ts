import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import { db } from "../config/db";

const generateShortUrl = (url: string) => {
  return nanoid(8);
};

const findByUrl = async (url: string) => {
  const result = await db("shortened_urls")
    .select("original_url")
    .where("short_url", url)
    .first()

  return result || null
};

const createShortUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { url: originalUrl } = req.body;
  const shortUrl = generateShortUrl(originalUrl);

  // TODO: Prevent duplicate short URLs

  const result = await db("shortened_urls")
    .insert({
      original_url: originalUrl,
      short_url: shortUrl,
      created_time: db.fn.now(),
    })
    .returning("*");

  console.log("Database insert result:", result);

  res.status(200).json({
    message: "Short URL created successfully",
    data: { shortUrl: `${process.env.BASE_URL}/${nanoid(8)}` },
  });
};

const getUrlFromShortUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!req.params || !req.params.shortUrl) {
    return res.status(400).json({
      message: "Short URL parameter is missing",
    });
  }

  const shortUrl = req.params.shortUrl.startsWith("/")
  ? req.params.shortUrl.slice(1)
  : req.params.shortUrl;
  
  const result = await findByUrl(shortUrl);
  console.log("Received short URL:", result);

  if (!result) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }

  res.redirect(result.original_url);
};

export default {
  createShortUrl,
  getUrlFromShortUrl,
};
