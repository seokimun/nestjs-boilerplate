import { BadRequestException, PipeTransform } from '@nestjs/common';
import { prettifyError, ZodSchema } from 'zod';
import ApiError from '../errors/api.error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw ApiError.BadRequest(
        '유효성 검사 실패',
        prettifyError(result.error),
      );
    }

    return result.data;
  }
}
