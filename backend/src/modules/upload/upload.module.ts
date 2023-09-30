import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoService } from '../upload/upload.service';
import { ArquivoController } from '../upload/upload.controller';
import { Image } from './entities/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ArquivoService],
  controllers: [ArquivoController],
})
export class ArquivoModule {}
