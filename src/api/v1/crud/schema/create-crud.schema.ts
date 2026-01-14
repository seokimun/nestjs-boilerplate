import { z } from 'zod';

export const CreateCrudSchema = z.object({
  testField1: z.string({
    error: 'testField1 is invalid',
  }),
  testField2: z.number({
    error: 'testField2 is invalid',
  }),
});

export type CreateCrudDto = z.infer<typeof CreateCrudSchema>;
