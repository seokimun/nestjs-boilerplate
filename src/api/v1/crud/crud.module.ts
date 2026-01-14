import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';

@Module({
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}
