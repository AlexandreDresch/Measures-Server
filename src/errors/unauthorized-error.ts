import { ApplicationError } from "utils/protocols";

export function unauthorizedError(message: string): ApplicationError {
  return {
    error_code: "UNAUTHORIZED",
    error_description: message,
  };
}
