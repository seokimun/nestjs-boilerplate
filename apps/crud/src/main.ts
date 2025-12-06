import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = app.get(ConfigService);
  const port = env.get<number>('CRUD_PORT');
}
bootstrap();
