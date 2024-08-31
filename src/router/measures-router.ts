import { Router } from "express";

import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares";

import {
  createMeasure,
  getCustomerMeasures,
  updateAndConfirmMeasureValue,
} from "../controllers/measures-controller";

import {
  createMeasureSchema,
  measureConfirmationSchema,
  measureParamsSchema,
  measureQuerySchema,
} from "../schemas/measures-schemas";

const measuresRouter = Router();

measuresRouter
  .get(
    "/:customerCode/list",
    validateParams(measureParamsSchema),
    validateQuery(measureQuerySchema),
    getCustomerMeasures
  )
  .post("/upload", validateBody(createMeasureSchema), createMeasure)
  .patch("/confirm", validateBody(measureConfirmationSchema), updateAndConfirmMeasureValue)

export { measuresRouter };
