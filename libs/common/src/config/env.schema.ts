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

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.coerce.number(),

  DATABASE_URL: z.string().url(),
});

export type EnvVars = z.infer<typeof envSchema>;
