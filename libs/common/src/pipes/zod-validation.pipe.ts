import { BadRequestException, PipeTransform } from '@nestjs/common';
import { prettifyError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        pretty: prettifyError(result.error), //보안 취약점(해커가 검증타입을 알아낼 수 있음)
      });
    }

    return result.data;
  }
}
