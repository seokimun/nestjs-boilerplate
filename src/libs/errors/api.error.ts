import { HttpException, HttpStatus } from '@nestjs/common';

class ApiError extends HttpException {
  constructor(
    statusCode: number,
    message: string,
    options?: { errors?: unknown; code?: string },
  ) {
    super(
      {
        statusCode,
        message,
        code: options?.code,
        errors: options?.errors,
      },
      statusCode,
    );
  }

  static BadRequest(
    message: string,
    code?: string,
    errors?: unknown,
  ): ApiError {
    return new ApiError(HttpStatus.BAD_REQUEST, message, { code, errors });
  }

  static Unauthorized(message = 'Unauthorized', code?: string): ApiError {
    return new ApiError(HttpStatus.UNAUTHORIZED, message, { code });
  }

  static Forbidden(message = 'Frobidden', code?: string): ApiError {
    return new ApiError(HttpStatus.FORBIDDEN, message, { code });
  }

  static NotFound(message = 'Not Found', code?: string): ApiError {
    return new ApiError(HttpStatus.NOT_FOUND, message, { code });
  }

  static Conflict(message: string, errors?: unknown, code?: string): ApiError {
    return new ApiError(HttpStatus.CONFLICT, message, { code, errors });
  }

  static InternalServerError(
    message = 'Internal Server Error',
    code?: string,
  ): ApiError {
    return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, message, { code });
  }

  static TooManyRequests(
    message = 'Too Many Requests',
    code?: string,
  ): ApiError {
    return new ApiError(HttpStatus.TOO_MANY_REQUESTS, message, { code });
  }

  static ServiceUnavailable(
    message = 'Service Unavailable',
    code?: string,
  ): ApiError {
    return new ApiError(HttpStatus.SERVICE_UNAVAILABLE, message, { code });
  }
}

export default ApiError;
