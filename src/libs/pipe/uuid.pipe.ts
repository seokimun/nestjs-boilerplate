import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import ApiError from '../errors/api.error';

export class UuidPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isUUID(value)) {
      throw ApiError.BadRequest(
        '잘못된 UUID 형식입니다',
        'INVALID_UUID_FORMAT',
      );
    }
    return value;
  }
}
