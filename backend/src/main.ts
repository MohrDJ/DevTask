import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.APP_PORT || 3001);
}

bootstrap();
