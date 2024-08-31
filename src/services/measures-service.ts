import { $Enums } from "@prisma/client";

import { CreateMeasureData } from "../utils/protocols";
import { extractStartAndEndOfMonth } from "utils/measures";
import { convertBase64ToFile } from "../utils/images";

import measuresRepository from "../repositories/measures-repository";

import googleGenAIService from "./google-genAI-service";

import { doubleReportError } from "../errors/double-report";
import { measureNotFound } from "../errors/measure-not-found";

async function getCustomerMeasures(
  customerCode: string,
  measureType?: $Enums.MeasureType
) {
  const measures = await measuresRepository.getCustomerMeasures(
    customerCode,
    measureType
  );

  if (!measures.length) {
    throw measureNotFound("Nenhuma leitura encontrada");
  }

  const formattedMeasures = measures.map((measure) => ({
    measure_uuid: measure.measure_uuid,
    measure_datetime: measure.measure_datetime,
    measure_type: measure.measure_type,
    has_confirmed: measure.has_confirmed,
    image_url: measure.image_url,
  }));

  return {
    customer_code: customerCode,
    measures: formattedMeasures,
  };
}

async function updateAndConfirmMeasureValue(
  measure_uuid: string,
  measure_value: number
) {
  const measureCount = await verifyMeasureExistence(measure_uuid);

  if (measureCount === 0) {
    throw measureNotFound("Leitura do mês já realizada");
  }

  const measureConfirmedCount = await verifyMeasureConfirmation(measure_uuid);

  if (measureConfirmedCount > 0) {
    throw doubleReportError({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura do mês já realizada",
    });
  }

  const measure = await measuresRepository.updateAndConfirmMeasureValue(
    measure_uuid,
    measure_value
  );

  if (!measure) {
    throw measureNotFound("Leitura não encontrada");
  }

  return;
}

async function uploadImage(data: CreateMeasureData) {
  const existingMeasure = await verifyExistingMeasureInCurrentMonth(data);

  if (existingMeasure) {
    throw doubleReportError({
      error_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada",
    });
  }

  const { tempFilePath, mimeType, fileName, fileBuffer } = convertBase64ToFile(
    data.image,
    data.customer_code
  );

  const imageUrl = await googleGenAIService.uploadImageToGoogleAIFileManager(
    tempFilePath,
    fileName,
    mimeType
  );

  const measureValue = await googleGenAIService.getMeasureDataFromImage(
    fileBuffer
  );

  const measureData = {
    customer_code: data.customer_code,
    measure_type: data.measure_type,
    measure_value: measureValue,
    measure_datetime: data.measure_datetime,
    image: imageUrl,
  };

  const measure = await measuresRepository.uploadMeasure(measureData);

  return {
    image_url: imageUrl,
    measure_value: measureValue,
    measure_uuid: measure.measure_uuid,
  };
}

async function verifyMeasureExistence(measure_uuid: string) {
  return await measuresRepository.verifyMeasureExistence(measure_uuid);
}

async function verifyMeasureConfirmation(measure_uuid: string) {
  return await measuresRepository.verifyMeasureConfirmation(measure_uuid);
}

async function verifyExistingMeasureInCurrentMonth(data: CreateMeasureData) {
  const { startDate, endDate } = extractStartAndEndOfMonth(
    data.measure_datetime
  );

  return await measuresRepository.verifyExistingMeasureInCurrentMonth({
    data,
    startDate,
    endDate,
  });
}

const measuresService = {
  getCustomerMeasures,
  uploadImage,
  updateAndConfirmMeasureValue,
};

export default measuresService;
