export enum HttpStatusCode {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}


type strictOkOrFail = "OK" | "FAIL"

interface ErrorResponse {
  message: string;
  code: HttpStatusCode;
  status: strictOkOrFail;
}

interface SuccessResponse<T> {
  message: string;
  code: HttpStatusCode;
  status: strictOkOrFail;
  data: T;
}

// Implementing getSuccessResponse function
export function getSuccessResponse<T>(
  data: T,
  message: string = "Success",
  code: HttpStatusCode = HttpStatusCode.OK,
  status: strictOkOrFail = "OK"
): SuccessResponse<T> {
  return {
    message,
    code,
    status,
    data,
  };
}

// Implementing getErrorResponse function
export function getErrorResponse(
  message: string = "Error",
  code: HttpStatusCode = HttpStatusCode.BadRequest,
  status: strictOkOrFail = "FAIL"
): ErrorResponse {
  return {
    message,
    code,
    status,
  };
}
