import { Controller, Get } from '@nestjs/common';
import { TipoTicketEntity } from '../entities/tipoticket.entity';
import { TipoTicketService } from '../services/tipoTicket.service';

@Controller('setor')
export class TipoTicketController {
  constructor(private readonly setorService: TipoTicketService) {}

  @Get()
  async findAll(): Promise<TipoTicketEntity[]> {
    return this.setorService.findAll();
  }
}
