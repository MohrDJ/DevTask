import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadEntity } from './entities/upload.entity';
import { dataBaseConfigOracle } from 'src/shared/database.provider';
import { FormularioEntity } from '../formulario/entities/formulario.entity';
import { FormularioService } from '../formulario/services/formulario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity, FormularioEntity], dataBaseConfigOracle)
  ],
  controllers: [UploadController],
  providers: [UploadService, FormularioService],
  exports: [UploadService],
})
export class UploadModule {}
