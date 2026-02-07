import { Module } from '@nestjs/common';
import { PrismaModule } from '../../libs/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UserModule,
    CrudModule,
    PrismaModule,
    MetricsModule,
  ],
})
export class V1Module {}
