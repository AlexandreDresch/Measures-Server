import { ApplicationError } from "utils/protocols";

export function invalidTypeError(message: string): ApplicationError {
  return {
    error_code: "INVALID_TYPE",
    error_description: message,
  };
}
