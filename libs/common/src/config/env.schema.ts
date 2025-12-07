import { z } from 'zod';

export const envSchema = z.object({
  // DATABASE_URL: z.string().url(),

  // JWT_SECRET: z.string().min(1),
  // JWT_EXPIRES_IN: z.string().default('3600s'),

  // GATEWAY_PORT: z.coerce.number().default(3000),
  HTTP_PORT: z.coerce.number(),
  AUTH_PORT: z.coerce.number(),
  USER_PORT: z.coerce.number(),
  CRUD_PORT: z.coerce.number(),
});

export type EnvVars = z.infer<typeof envSchema>;
