import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuração do Multer para armazenar os arquivos no diretório "uploads"
  app.use(multer({ dest: './uploads' }).single('image'));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
