import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ZdoValidationPipe } from '../../../libs/pipe/zod-validation.pipe';
import { CrudService } from './crud.service';
import {
  CreateCrudSchema,
  type CreateCrudDto,
} from './schema/create-crud.schema';
import {
  UpdateCrudSchema,
  type UpdateCrudDto,
} from './schema/update-crud.schema';

@Controller({ path: 'crud', version: '1' })
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
  create(@Body(new ZdoValidationPipe(CreateCrudSchema)) dto: CreateCrudDto) {
    return this.crudService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZdoValidationPipe(UpdateCrudSchema)) dto: UpdateCrudDto,
  ) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.crudService.delete(id);
  }
}
