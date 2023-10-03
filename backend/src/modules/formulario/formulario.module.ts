import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioController } from './formulario.controller';
import { FormularioService } from './formulario.service';
import { FormularioEntity } from './entities/formulario.entity';
import { dataBaseConfigOracle } from 'src/shared/database.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormularioEntity], dataBaseConfigOracle),
  ],
  controllers: [FormularioController],
  providers: [FormularioService],
  exports: [FormularioService],
})
export class FormularioModule {}
