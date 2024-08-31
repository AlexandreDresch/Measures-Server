import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { ApplicationError } from "../utils/protocols";

export function handleApplicationErrors(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.error_code === "UNAUTHORIZED") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      error_description: err.error_description,
    });
  }

  if (
    err.error_code === "DOUBLE_REPORT" ||
    err.error_code === "CONFIRMATION_DUPLICATE"
  ) {
    return res.status(httpStatus.CONFLICT).send({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }

  if (err.error_code === "UPLOAD_ERROR") {
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }

  if (err.error_code === "INVALID_TYPE") {
    return res.status(httpStatus.BAD_REQUEST).send({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }

  if (err.error_code === "MEASURE_NOT_FOUND") {
    return res.status(httpStatus.NOT_FOUND).send({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  }

  console.log(err);

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error_code: err.error_code || "InternalServerError",
    error_description: err || "Internal Server Error.",
  });
}
