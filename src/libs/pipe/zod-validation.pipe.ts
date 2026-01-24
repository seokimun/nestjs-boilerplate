import { BadRequestException, PipeTransform } from '@nestjs/common';
import { prettifyError, ZodSchema } from 'zod';

export class ZdoValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: prettifyError(result.error),
      });
    }

    return result.data;
  }
}
