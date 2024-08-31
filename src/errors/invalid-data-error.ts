import { ApplicationError } from "utils/protocols";

export function invalidDataError(details: string[]): ApplicationError {
  return {
    error_code: "INVALID_DATA",
    error_description: details,
  };
}
