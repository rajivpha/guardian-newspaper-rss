import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import logger from './logger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: logger,
  });

  //global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
      stopAtFirstError: true,
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(app.get(ConfigService).get('port'));
}

bootstrap()
  .then(() => console.info('************STARTED*************'))
  .catch((err) => {
    console.log(err.message);
  });
