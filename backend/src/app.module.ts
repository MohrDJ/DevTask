import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioModule } from './modules/formulario/formulario.module';
import { dataBaseConfigOracle } from './shared/database.provider';
import { UploadModule } from './modules/upload/upload.module';
import { CorsMiddleware } from './middlewares/auth.middleware';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfigOracle),
    FormularioModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Configura o middleware CORS
    consumer.apply(CorsMiddleware).forRoutes('*');

    // Configuração do Multer para armazenar os arquivos no diretório "uploads"
    const storage = multer.diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    });

    const upload = multer({ storage }).single('image');

    // Aplica o middleware de upload para uma rota específica
    consumer
      .apply(upload)
      .forRoutes({ path: 'upload', method: RequestMethod.POST });
  }
}
