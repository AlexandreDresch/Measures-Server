import Joi from "joi";
import { $Enums } from "@prisma/client";

import { CreateMeasureData } from "../utils/protocols";
import { base64ImageRegex } from "../utils/images";

export const createMeasureSchema = Joi.object<CreateMeasureData>({
  image: Joi.string().pattern(base64ImageRegex).required(),
  customer_code: Joi.string().alphanum().min(3).max(20).required(),
  measure_datetime: Joi.date().iso().required(),
  measure_type: Joi.string()
    .valid(...Object.values($Enums.MeasureType))
    .required(),
});

export const measureParamsSchema = Joi.object({
  customerCode: Joi.string().required(),
});

export const measureQuerySchema = Joi.object({
  measure_type: Joi.string()
    .valid(...Object.values($Enums.MeasureType))
    .optional(),
});

export const measureConfirmationSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required(),
});
