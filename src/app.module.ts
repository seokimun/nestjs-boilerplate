import { Module } from '@nestjs/common';
import { V1Module } from './api/v1/v1.module';
import { PrismaModule } from './libs/prisma/prisma.module';

@Module({
  imports: [V1Module, PrismaModule],
})
export class AppModule {}
