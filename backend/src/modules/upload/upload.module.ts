import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadEntity } from './entities/upload.entity';
import { dataBaseConfigOracle } from 'src/shared/database.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity], dataBaseConfigOracle)
  ],
  controllers: [UploadController], 
  providers: [UploadService],
  exports: [UploadService],
})
export class ArquivoModule {}
