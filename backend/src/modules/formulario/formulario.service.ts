import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormularioEntity } from './entities/formulario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(FormularioEntity)
    private readonly formularioModelRepository: Repository<FormularioEntity>,
  ) {}

  async create(formularioData: any) {

  }

  async findAll() {

  }
}
