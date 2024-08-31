import { $Enums } from "@prisma/client";

import { prisma } from "../config";

import { CreateMeasureData, UploadMeasureGeminiData } from "utils/protocols";

async function uploadMeasure(data: UploadMeasureGeminiData) {
  try {
    const measure = await prisma.measure.create({
      data: {
        image_url: data.image,
        customer_code: data.customer_code,
        measure_value: data.measure_value,
        measure_datetime: data.measure_datetime,
        measure_type: data.measure_type,
      },
    });

    return measure;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCustomerMeasures(
  customer_code: string,
  measure_type?: $Enums.MeasureType
) {
  const where: any = { customer_code };
  if (measure_type) {
    where.measure_type = measure_type;
  }

  return await prisma.measure.findMany({
    where,
  });
}

async function updateAndConfirmMeasureValue(
  measure_uuid: string,
  measure_value: number
) {
  const measure = await prisma.measure.update({
    where: {
      measure_uuid,
    },
    data: {
      measure_value,
      has_confirmed: true,
    },
  });

  return measure;
}

async function verifyMeasureExistence(measure_uuid: string) {
  return await prisma.measure.count({
    where: {
      measure_uuid,
    },
  });
}

async function verifyMeasureConfirmation(measure_uuid: string) {
  return await prisma.measure.count({
    where: {
      measure_uuid,
      has_confirmed: true,
    },
  });
}

async function verifyExistingMeasureInCurrentMonth({
  data,
  startDate,
  endDate,
}: {
  data: CreateMeasureData;
  startDate: Date;
  endDate: Date;
}) {
  return await prisma.measure.findFirst({
    where: {
      customer_code: data.customer_code,
      measure_type: data.measure_type,
      measure_datetime: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

const measuresRepository = {
  uploadMeasure,
  getCustomerMeasures,
  updateAndConfirmMeasureValue,
  verifyMeasureExistence,
  verifyMeasureConfirmation,
  verifyExistingMeasureInCurrentMonth,
};

export default measuresRepository;
