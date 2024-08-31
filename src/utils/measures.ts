import { endOfMonth, startOfMonth } from "date-fns";

export async function generateContentFromImage(
  model: any,
  base64Image: string
): Promise<any> {
  const prompt =
    "Analyze the provided image and identify the numerical value displayed on the meter. The meter could be either a water or gas meter. Please extract and provide the visible numerical value shown on the meter. If the value is not clearly visible, indicate this clearly in your response.";

  return model.generateContentStream([
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    },
    { text: prompt },
  ]);
}

export async function extractMeasureValueFromStream(
  stream: any
): Promise<number | null> {
  let extractedValue: number | null = null;

  for await (const chunk of stream) {
    const chunkText = chunk.text();
    const value = extractMeasureValueFromText(chunkText);
    if (value) {
      extractedValue = value;
    }
  }

  return extractedValue;
}

export function extractMeasureValueFromText(
  detectedValue: string
): number | null {
  const match = detectedValue.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

export function extractStartAndEndOfMonth(measure_datetime: string) {
  const startDate = startOfMonth(new Date(measure_datetime));
  const endDate = endOfMonth(new Date(measure_datetime));

  return { startDate, endDate };
}
