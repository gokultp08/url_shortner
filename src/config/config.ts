import dotenv from "dotenv";
import { ENVS } from "../utils/constants";

dotenv.config();

const getConfig = () => ({
  NODE_ENV: process.env.NODE_ENV || ENVS.dev,
  PORT: process.env.PORT || 3000,
  BASE_URL: process.env.BASE_URL || `localhost`,
  DATABASE: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    PASSWORD: process.env.REDIS_PASSWORD,
  },
});

const config = getConfig();

export default config;
