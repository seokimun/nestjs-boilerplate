import { ZodValidationPipe } from '@app/common-config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import type { CreateCrudDto } from './schema/create-crud.schema';
import { CreateCrudSchema } from './schema/create-crud.schema';
import type { UpdateCrudDto } from './schema/update-crud.schema';
import { UpdateCrudSchema } from './schema/update-crud.schema';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  findAll() {
    return this.crudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  create(@Body(new ZodValidationPipe(CreateCrudSchema)) dto: CreateCrudDto) {
    return this.crudService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCrudSchema)) dto: UpdateCrudDto,
  ) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.crudService.delete(id);
  }
}
