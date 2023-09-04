import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

const port = process.env.PORT || 3000; // deploy

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any non-specific field
    }),
  );

  app.use('/static', express.static(join(__dirname, '..', 'public')));
  await app.listen(port);
}
bootstrap();
