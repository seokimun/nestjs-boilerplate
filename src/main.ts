import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './libs/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(env.HTTP_PORT);
}
bootstrap();
