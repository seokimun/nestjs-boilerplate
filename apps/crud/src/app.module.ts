import { envSchema } from '@app/common-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const parsed = envSchema.safeParse(env);

        if (!parsed.success) {
          throw new Error('Invalid enviroment variables');
        }

        return parsed.data;
      },
    }),
    CrudModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
