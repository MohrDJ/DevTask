import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioModule } from './modules/formulario/formulario.module';
import { dataBaseConfigOracle } from './shared/database.provider';
import { ArquivoController } from './modules/upload/upload.controller';
import { ArquivoService } from './modules/upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfigOracle),
    FormularioModule,
  ],
  controllers: [ArquivoController],
  providers: [ArquivoService],
})
export class AppModule {}
