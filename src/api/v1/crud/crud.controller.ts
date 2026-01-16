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
import { CrudSwagger } from './swagger/crud.swagger';

@Controller({ path: 'crud', version: '1' })
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  @CrudSwagger.FindAll()
  findAll() {
    return this.crudService.findAll();
  }

  @Get(':id')
  @CrudSwagger.FindOne()
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  @CrudSwagger.Create()
  create(@Body(new ZdoValidationPipe(CreateCrudSchema)) dto: CreateCrudDto) {
    return this.crudService.create(dto);
  }

  @Patch(':id')
  @CrudSwagger.Update()
  update(
    @Param('id') id: string,
    @Body(new ZdoValidationPipe(UpdateCrudSchema)) dto: UpdateCrudDto,
  ) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  @CrudSwagger.Delete()
  delete(@Param('id') id: string) {
    return this.crudService.delete(id);
  }
}
