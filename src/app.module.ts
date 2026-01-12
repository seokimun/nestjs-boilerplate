import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './api/v1/auth/guard/roles.guard';
import { JwtAuthGuard } from './api/v1/auth/jwt/jwt.guard';
import { V1Module } from './api/v1/v1.module';
import { envSchema } from './libs/config/env.schema';
import { LoggerMiddleware } from './libs/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const parsed = envSchema.safeParse(env);

        if (!parsed.success) {
          console.error('ENV VALIDATION ERROR:', parsed.error.format()); //개발환경
          throw new Error('Invalid environment variables');
        }

        return parsed.data;
      },
    }),
    V1Module,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
