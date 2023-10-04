import { Controller, Get } from '@nestjs/common';
import { TipoTicketEntity } from '../entities/tipoticket.entity';
import { TipoTicketService } from '../services/tipoTicket.service';

@Controller('tipoTicket')
export class TipoTicketController {
  constructor(private readonly TipoTicketService: TipoTicketService) {}

  @Get()
  async findAll(): Promise<TipoTicketEntity[]> {
    return this.TipoTicketService.findAll();
  }
}
