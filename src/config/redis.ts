import { createClient } from "redis";
import config from "./config";

export const redisClient = createClient({
  url: config.REDIS.URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    throw error;
  }
};
