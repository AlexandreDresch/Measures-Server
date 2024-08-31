import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

import {
  extractMeasureValueFromStream,
  generateContentFromImage,
} from "../utils/measures";

import { GeminiImageUploadResponse } from "../utils/protocols";

import { uploadError } from "../errors/upload-error";
import { invalidDataError } from "errors/invalid-data-error";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

async function getMeasureDataFromImage(buffer: Buffer): Promise<number> {
  const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const base64Image = buffer.toString("base64");

  try {
    const result = await generateContentFromImage(generativeModel, base64Image);
    const measureValue = await extractMeasureValueFromStream(result.stream);

    if (!measureValue) {
      throw invalidDataError(["Não foi possível extrair a medição da imagem."]);
    }

    return measureValue;
  } catch (error) {
    throw invalidDataError(error);
  }
}

async function uploadImageToGoogleAIFileManager(
  filePath: string,
  displayName: string,
  mimeType: string
): Promise<string> {
  try {
    const response = await uploadFile(filePath, displayName, mimeType);

    const fileUri = getFileUriFromResponse(response);
    if (!fileUri) {
      throw uploadError("File URI not found in the upload response.");
    }

    return fileUri;
  } catch (error) {
    throw uploadError(error.message);
  }
}

async function uploadFile(
  filePath: string,
  displayName: string,
  mimeType: string
): Promise<GeminiImageUploadResponse> {
  return fileManager.uploadFile(filePath, {
    mimeType,
    displayName,
  });
}

function getFileUriFromResponse(
  response: GeminiImageUploadResponse
): string | null {
  return response.file?.uri ?? null;
}

const googleGenAIService = {
  getMeasureDataFromImage,
  uploadImageToGoogleAIFileManager,
};

export default googleGenAIService;
