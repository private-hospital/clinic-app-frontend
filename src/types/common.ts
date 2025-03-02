export interface AbstractResponseDto<T> {
  payloadType: string;
  payload: T;
}

export enum ErrorTypes {
  AUTH_ERROR,
}

export interface ErrorResponseDto {
  errorType: ErrorTypes;
  message?: string | null;
}

export class ApiError extends Error {
  public errorType: ErrorTypes;
  constructor(errorResponse: ErrorResponseDto) {
    super(errorResponse.message ?? 'no message');
    this.name = 'ApiError';
    this.errorType = errorResponse.errorType;
  }
}
