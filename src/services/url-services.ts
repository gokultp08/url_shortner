import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { generateShortUrl } from "../utils/utils";
import { getValue, setValue } from "../config/redis";
import { REDIS_KEY_NAME } from "../utils/constants";

const findByUrl = async (url: string) => {
  const result = await db("shortened_urls")
    .select("original_url")
    .where("short_url", url)
    .first();

  return result || null;
};

const createShortUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { url: originalUrl } = req.body;
    let shortUrl = generateShortUrl(originalUrl);

    while (await findByUrl(shortUrl)) {
      shortUrl = generateShortUrl(originalUrl);
    }

    await db("shortened_urls").insert({
      original_url: originalUrl,
      short_url: shortUrl,
      created_time: db.fn.now(),
    });

    setValue(`${REDIS_KEY_NAME}_${shortUrl}`, originalUrl);

    res.status(200).json({
      message: "Short URL created successfully",
      data: { shortUrl: `${process.env.BASE_URL}/${shortUrl}` },
    });
  } catch (error) {
    console.error(
      "Error creating short URL -> url-services.ts -> createShortUrl",
      error
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUrlFromShortUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const shortUrl = req.params?.shortUrl;

    if (!shortUrl) {
      return res.status(400).json({
        message: "Short URL parameter is missing",
      });
    }

    const cachedResult = await getValue(`${REDIS_KEY_NAME}_${shortUrl}`);

    if (cachedResult) {
      return res.redirect(cachedResult);
    }

    const result = await findByUrl(shortUrl);

    if (!result) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    setValue(`${REDIS_KEY_NAME}_${shortUrl}`, result.original_url);

    res.redirect(result.original_url);
  } catch (error) {
    console.error(
      "Error retrieving original URL from short URL -> url-services.ts -> getUrlFromShortUrl",
      error
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createShortUrl,
  getUrlFromShortUrl,
};
