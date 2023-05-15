import { NestFactory } from '@nestjs/core';
import { AppModule } from './models/app/app.module';
import { APP_PORT } from '@st/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  await app.listen(APP_PORT);
}
bootstrap();
