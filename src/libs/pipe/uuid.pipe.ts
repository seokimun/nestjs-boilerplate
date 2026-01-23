import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

export class UuidPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}
