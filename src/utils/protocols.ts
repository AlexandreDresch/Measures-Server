import { $Enums } from "@prisma/client";

export interface ApplicationError {
  error_code: string;
  error_description: string | string[];
}

export interface CreateMeasureData {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: $Enums.MeasureType;
}

export interface UploadMeasureGeminiData extends CreateMeasureData {
  measure_value: number | null;
}

export interface GeminiImageUploadResponse {
  file?: {
    uri?: string;
  };
}

export interface MeasureResponse {
  customer_code: string;
  measures: {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: $Enums.MeasureType;
    has_confirmed: boolean;
    image_url: string;
  }[];
}

export interface Base64ConversionResponse {
  fileName: string;
  mimeType: string;
  tempFilePath: string;
  fileBuffer: Buffer;
}
