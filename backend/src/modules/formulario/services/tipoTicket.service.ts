import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_ORACLE_DATABASE } from 'src/shared/database.provider';
import { Repository } from 'typeorm';
import { TipoTicketEntity } from '../entities/tipoticket.entity';

@Injectable()
export class TipoTicketService {
  constructor(
    @InjectRepository(TipoTicketEntity, DB_ORACLE_DATABASE)
    private readonly tipoTicketRepository: Repository<TipoTicketEntity>,
  ) {}

  async findAll(): Promise<TipoTicketEntity[]> {
    return this.tipoTicketRepository.find();
  }
}
