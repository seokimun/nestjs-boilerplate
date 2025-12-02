import { Injectable } from '@nestjs/common';

@Injectable()
export class CrudService {
  getHello(): string {
    return 'Hello World!';
  }
}
