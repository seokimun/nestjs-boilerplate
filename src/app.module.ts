import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { V1Module } from './api/v1/v1.module';
import { LoggerMiddleware } from './libs/middleware/logger.middleware';
import { PrismaModule } from './libs/prisma/prisma.module';

@Module({
  imports: [V1Module, PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
