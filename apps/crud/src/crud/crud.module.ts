import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
  imports: [],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}
