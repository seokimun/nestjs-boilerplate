import { z } from 'zod';
import { CreateCrudSchema } from './create-crud.schema';

export const UpdateCrudSchema = CreateCrudSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' },
);

export type UpdateCrudDto = z.infer<typeof UpdateCrudSchema>;
