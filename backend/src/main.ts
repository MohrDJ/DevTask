import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração do Multer para armazenar os arquivos no diretório "uploads"
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      callback(null, file.originalname); // Use o nome original do arquivo
    },
  });

  const upload = multer({ storage }).single('image');

  app.use(upload);

  await app.listen(process.env.APP_PORT);
}

bootstrap();
