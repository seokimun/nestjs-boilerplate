import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const res = exception.getResponse();

    const base = {
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (typeof res === 'string') {
      return response.status(status).json({
        statusCode: status,
        message: res,
        ...base,
      });
    }

    return response.status(status).json({
      ...res,
      ...base,
    });
  }
}
