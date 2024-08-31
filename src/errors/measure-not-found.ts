import { ApplicationError } from "utils/protocols";

export function measureNotFound(message: string): ApplicationError {
  return {
    error_code: "MEASURE_NOT_FOUND",
    error_description: message,
  };
}
