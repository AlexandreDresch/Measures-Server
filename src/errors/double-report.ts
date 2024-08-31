import { ApplicationError } from "utils/protocols";

export function doubleReportError({
  error_code,
  error_description,
}: ApplicationError): ApplicationError {
  return {
    error_code: error_code,
    error_description: error_description,
  };
}
