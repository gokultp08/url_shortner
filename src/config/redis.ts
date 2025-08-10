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

export const setValue = (key: string, value: string, expiration?: number) => {
  if (expiration) {
    return redisClient.setEx(key, expiration, value);
  }
  return redisClient.set(key, value);
};

export const getValue = (key: string) => {
  return redisClient.get(key);
};
