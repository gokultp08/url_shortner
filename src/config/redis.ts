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
  if (!redisClient.isReady) {
    console.warn("Redis client is not connected. Skipping setValue operation.");
    return null;
  }
  if (expiration) {
    return redisClient.setEx(key, expiration, value);
  }
  return redisClient.set(key, value);
};

export const getValue = async (key: string) => {
  if (!redisClient.isReady) {
    console.warn("Redis client is not connected. Skipping getValue operation.");
    return null;
  }

  const value = await redisClient.get(key);
  return value || null;
};
