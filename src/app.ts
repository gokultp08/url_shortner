import express from "express";
import urlController from "./controllers/url-controller";
import { logger } from "./middlewares/logger";
import { customErrorHandler } from "./middlewares/custom-error-handler";

const app = express();

app.use(express.json());

app.get("/health", (_req: any, res: any) => {
  res.status(200).send("ok");
});

app.use(logger);

app.use("/api/v1/url", urlController);

app.use(customErrorHandler);

export default app;
