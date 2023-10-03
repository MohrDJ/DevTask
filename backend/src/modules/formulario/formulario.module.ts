import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioController } from './controllers/formulario.controller';
import { FormularioService } from './services/formulario.service';
import { FormularioEntity } from './entities/formulario.entity';
import { dataBaseConfigOracle } from 'src/shared/database.provider';
import { SetorController } from './controllers/setor.controller';
import { TipoTicketController } from './controllers/tipoTicket.controller';
import { SetorEntity } from './entities/setor.entity';
import { TipoTicketEntity } from './entities/tipoticket.entity';
import { SetorService } from './services/setor.service';
import { TipoTicketService } from './services/tipoTicket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormularioEntity, 
      SetorEntity, 
      TipoTicketEntity], dataBaseConfigOracle),
  ],
  controllers: [FormularioController, SetorController, TipoTicketController],
  providers: [FormularioService, SetorService, TipoTicketService],
  exports: [FormularioService],
})
export class FormularioModule {}
