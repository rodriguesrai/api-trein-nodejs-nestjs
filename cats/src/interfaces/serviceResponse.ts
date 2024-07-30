// ServiceResponse.ts

export type ServiceMessage = { message: string };

// type ServiceResponseErrorType =
//   | 'INVALID_DATA'
//   | 'UNAUTHORIZED'
//   | 'NOT_FOUND'
//   | 'CONFLICT'
//   | 'UNPROCESSABLE_CONTENT';

export type ServiceResponseError = {
  status: number;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: number;
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
