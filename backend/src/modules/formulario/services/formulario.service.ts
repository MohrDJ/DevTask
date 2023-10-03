import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormularioEntity } from '../entities/formulario.entity';
import { DB_ORACLE_DATABASE } from 'src/shared/database.provider';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(FormularioEntity, DB_ORACLE_DATABASE)
    private readonly formularioRepository: Repository<FormularioEntity>,
  ) {}

  async create(formularioCriar: FormularioEntity): Promise<FormularioEntity> {
    const createdFormulario = await this.formularioRepository.save(formularioCriar);
    return createdFormulario;
  }

  async findAll(): Promise<FormularioEntity[]> {
    return this.formularioRepository.find();
  }

  async findOneByTicketId(ticketId: number): Promise<FormularioEntity | undefined> {
    return this.formularioRepository.findOne({ where: { id: ticketId } });
  }  
}
