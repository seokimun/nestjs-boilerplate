import { Module } from '@nestjs/common';
import { V1Module } from './api/v1/v1.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './libs/prisma/prisma.module';

@Module({
  imports: [V1Module, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
