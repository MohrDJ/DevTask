import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormularioModel } from './formulario.model';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(FormularioModel)
    private readonly formularioRepository: Repository<FormularioModel>,
  ) {}

  async create(formularioData: FormularioModel): Promise<FormularioModel> {
    const novoFormulario = this.formularioRepository.create(formularioData);
    return await this.formularioRepository.save(novoFormulario);
  }

  async findAll(): Promise<FormularioModel[]> {
    return await this.formularioRepository.find();
  }

//   async findOne(id: number): Promise<FormularioModel> {
//     return await this.formularioRepository.findOne(id);
//   }
}
