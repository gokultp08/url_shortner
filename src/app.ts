import express from "express";
import urlController from "./controllers/url-controller";
import { requestLogger } from "./middlewares/request-logger";
import { customErrorHandler } from "./middlewares/custom-error-handler";
import { initializeDatabase } from "./config/db";
import { connectRedis } from "./config/redis";

const app = express();

app.use(express.json());

initializeDatabase()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to the database!!!", error);
    process.exit(1);
  });

connectRedis()
  .then(() => {
    console.log("Redis connection established successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to Redis!!!", error);
  });

app.use(requestLogger);

app.get("/health", (_req: any, res: any) => {
  res.status(200).send("ok");
});

app.use(urlController);

app.use(customErrorHandler);

export default app;
