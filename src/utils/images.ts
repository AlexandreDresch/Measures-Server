import { writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { Buffer } from "buffer";
import { format } from "date-fns";

import { Base64ConversionResponse } from "./protocols";

import { invalidDataError } from "../errors/invalid-data-error";

export function convertBase64ToFile(
  base64String: string,
  customerCode: string
): Base64ConversionResponse {
  const base64Data = extractBase64Data(base64String);
  const fileBuffer = Buffer.from(base64Data, "base64");

  const mimeType = getMimeType(base64String);
  const fileName = generateFileName(customerCode, mimeType);
  const tempFilePath = join(tmpdir(), fileName);

  writeFile(tempFilePath, fileBuffer);

  return { fileName, mimeType, tempFilePath, fileBuffer };
}

function extractBase64Data(base64Image: string): string {
  const base64Data = base64Image.split(";base64,").pop();
  if (!base64Data) {
    throw invalidDataError(["Imagem em formato inválido."]);
  }
  return base64Data;
}

function getMimeType(base64Image: string): string {
  const mimeTypeMatch = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,/);
  return mimeTypeMatch ? mimeTypeMatch[1] : "image/png";
}

function generateFileName(customerCode: string, mimeType: string): string {
  const extension = mimeType.split("/")[1];
  return `${customerCode}-${getFormattedDate()}.${extension}`;
}

function writeFile(path: string, buffer: Buffer): void {
  try {
    writeFileSync(path, buffer);
  } catch (error) {
    throw invalidDataError(error.message);
  }
}

function getFormattedDate(): string {
  const now = new Date();
  return format(now, "yyyy-MM-dd");
}

export const base64ImageRegex = /^data:image\/\w+;base64,[A-Za-z0-9+/=]+$/;
