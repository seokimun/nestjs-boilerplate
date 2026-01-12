import { z } from 'zod';

export const envSchema = z.object({
  HTTP_PORT: z.coerce.number(),
  POSTGRES_PORT: z.coerce.number(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  DATABASE_URL: z.string().url(),
});
