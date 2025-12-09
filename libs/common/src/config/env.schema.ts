import { z } from 'zod';

export const envSchema = z.object({
  // GATEWAY_PORT: z.coerce.number().default(3000),
  HTTP_PORT: z.coerce.number(),
  AUTH_PORT: z.coerce.number(),
  USER_PORT: z.coerce.number(),
  CRUD_PORT: z.coerce.number(),
  DATABASE_PORT: z.coerce.number(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  DATABASE_URL: z.string().url(),

  // JWT_SECRET: z.string().min(1),
  // JWT_EXPIRES_IN: z.string().default('3600s'),
});

export type EnvVars = z.infer<typeof envSchema>;
