import { envSchema } from '@app/common-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../../auth/src/auth/auth.module';
import { RolesGuard } from '../../auth/src/auth/guard/roles.guard';
import { JwtAuthGuard } from '../../auth/src/auth/jwt/jwt.guard';
import { PrismaModule } from '../../prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const parsed = envSchema.safeParse(env);

        if (!parsed.success) {
          throw new Error('Invalid environment variables');
        }

        return parsed.data;
      },
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    HealthModule,
  ],
  controllers: [],
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
export class AppModule {}
