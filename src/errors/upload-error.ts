import { ApplicationError } from "utils/protocols";

export function uploadError(message: string): ApplicationError {
  return {
    error_code: "UPLOAD_ERROR",
    error_description: message,
  };
}
