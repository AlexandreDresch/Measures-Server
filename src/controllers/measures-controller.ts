import { $Enums } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";

import measuresService from "../services/measures-service";

export async function getCustomerMeasures(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const measureType = req.query.measure_type as $Enums.MeasureType;
  const customerCode = req.params.customerCode;

  try {
    const measures = await measuresService.getCustomerMeasures(
      customerCode,
      measureType
    );

    return res.status(httpStatus.OK).send(measures);
  } catch (error) {
    next(error);
  }
}

export async function createMeasure(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {
    const measure = await measuresService.uploadImage({
      image,
      customer_code,
      measure_datetime,
      measure_type,
    });

    return res.status(httpStatus.OK).send(measure);
  } catch (error) {
    next(error);
  }
}

export async function updateAndConfirmMeasureValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { measure_uuid, confirmed_value } = req.body;

  try {
    await measuresService.updateAndConfirmMeasureValue(
      measure_uuid,
      confirmed_value
    );

    return res.status(httpStatus.OK).send({ success: true });
  } catch (error) {
    next(error);
  }
}
