import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import * as i18nConfig from './@config/i18n/i18n.config';

import { AppModule } from './app.module';
import { TransformInterceptor } from './@interceptors/transform.interceptor';
import { HttpExceptionFilter } from './@filters/http-exception.filter';
import { TimeoutInterceptor } from './@interceptors/timeout.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const port = process.env.PORT ? process.env.PORT : 3333;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port);

  i18nConfig.init(process.env.FALLBACK_LANGUAGE);

  logger.log(`App running on ${port}`);
}

bootstrap();
