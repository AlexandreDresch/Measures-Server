import "reflect-metadata";
import "express-async-errors";

import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";

loadEnv();

import { handleApplicationErrors } from "./middlewares";
import { measuresRouter } from "./router/measures-router";

const app = express();
app
  .use(cors())
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use("/", measuresRouter)
  .get("/health", (_req, res) => res.send("OK!"))
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
