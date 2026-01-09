import { BadRequestException, PipeTransform } from '@nestjs/common';
import { prettifyError, ZodSchema } from 'zod';

export class ZdoValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        pretty: prettifyError(result.error), //운영 시 제거(보안 취약점)
      });
    }

    return result.data;
  }
}
