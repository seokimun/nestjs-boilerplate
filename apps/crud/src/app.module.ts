import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [CrudModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
