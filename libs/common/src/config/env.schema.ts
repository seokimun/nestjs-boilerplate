import { z } from 'zod';

export const envSchema = z.object({
  // DATABASE_URL: z.string().url(),

  // JWT_SECRET: z.string().min(1),
  // JWT_EXPIRES_IN: z.string().default('3600s'),

  // GATEWAY_PORT: z.coerce.number().default(3000),
  AUTH_PORT: z.coerce.number().default(3001),
  USER_PORT: z.coerce.number().default(3002),
  CRUD_PORT: z.coerce.number().default(3003),
});

export type EnvVars = z.infer<typeof envSchema>;
