import { z } from 'zod';

export const envSchema = z.object({
  HTTP_PORT: z.coerce.number(),
  POSTGRES_PORT: z.coerce.number(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  DATABASE_URL: z.string().url(),
});
