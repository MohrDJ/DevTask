import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioModule } from './modules/formulario/formulario.module';
import { dataBaseConfigOracle } from './shared/database.provider';
import { ArquivoModule } from './modules/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfigOracle),
    FormularioModule,
    ArquivoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
