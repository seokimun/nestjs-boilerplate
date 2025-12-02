import { Controller, Get } from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller()
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  getHello(): string {
    return this.crudService.getHello();
  }
}
