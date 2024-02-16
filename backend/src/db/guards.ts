import { ErrnoException } from "./interfaces";

// Type guard to check if the error is an ErrnoException
export function isErrorWithCode(error: unknown): error is ErrnoException {
  return error instanceof Error && "code" in error;
}