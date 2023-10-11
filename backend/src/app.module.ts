import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsMiddleware } from './middlewares/auth.middleware';
import { FormularioModule } from './modules/formulario/formulario.module';
import { UploadModule } from './modules/upload/upload.module';
import { dataBaseConfigOracle } from './shared/database.provider';

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

  }
}
