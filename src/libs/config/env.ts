import { envSchema } from './env.schema';

export const env = envSchema.parse(process.env);

export type Env = typeof env;
