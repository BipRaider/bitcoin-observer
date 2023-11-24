import { HttpStatus, ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

const logger: Logger = new Logger('Api');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: configService.get('FRONTEND_URL') ?? 'http://localhost:3000',
    credentials: true,
  });

  const port = configService.get('PORT') ?? 8080;

  await app.listen(port, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
