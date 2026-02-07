import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      Logger.log(
        `HTTP request ${res.statusCode} | ${req.method} | ${req.originalUrl}`,
      );
    });
    next();
  }
}
